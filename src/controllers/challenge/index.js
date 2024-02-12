// Import necessary modules
const projectConfig = require("../../config");
const Challenge = require("../../models/challenge");
const TrendingModel = require("../../models/trending");
const UserModel = require("../../models/user");
const { selectUniqueQuestions, findQuestionLevel } = require("../../utils/challenge");
const { createChallengeValidation } = require("../../validations/challenge");

const createChallenge = async (req, res) => {
  try {
    const { city, college } = req.query;
    const validation = createChallengeValidation(req.body);
    if (validation.error) {
      return res.status(422).json({ success: false, message: validation.error.details[0].message });
    }

    const userId = req.user._id;

    let [userA, availableUsers, newUsers] = await Promise.all([
      UserModel.findById(userId).lean(),
      UserModel.find({
        _id: { $ne: userId },
        role: 'user',
        ...(city && { city }),
        ...(college && { college }),
        $or: [
          { lastPlayed: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
          { lastPlayed: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) } },
        ],
      }).lean(),
      UserModel.find({ _id: { $ne: userId }, role: 'user' }).sort({ createdAt: -1 }).limit(10).lean()
    ]);

    if (availableUsers.length === 0 && newUsers.length === 0) {
      const resp = {
        status: false,
        message: "No users found",
      };
      return res.status(404).send(resp);
    } else if (availableUsers.length === 0) {
      availableUsers = newUsers;
    }


    let userIds = {};
    let userB = "";

    userIds = availableUsers.map((c) => c._id);
    //................find opponent below my Level or above my level...........................................................
    const userLevel = userA.level;
    const temp = userLevel;
    const match = temp.match(/\d+/);
    const levelIndex = Number(match[0]);

    let low = levelIndex, high = levelIndex + 1;

    while (low > 0 || high <= 10) {
      const lowLevel = "Level" + low.toString();
      if (low < 0) {
        low = 0;
      }

      let foundLowLevelUsers = {};
      if (low > 0) {
        foundLowLevelUsers = availableUsers.filter(c => c.level === lowLevel);
      }

      const highLevel = "Level" + high.toString();
      let foundHighLevelUsers = {};
      if (high <= 10) {
        foundHighLevelUsers = availableUsers.filter(c => c.level === highLevel);
      }

      if (foundLowLevelUsers.length) {
        const usrIndx = Math.floor(Math.random() * foundLowLevelUsers.length);
        const userIDs = foundLowLevelUsers.map((c) => c._id);
        const lowLevelUsrId = userIDs[usrIndx];
        userB = lowLevelUsrId;
        break;
      }
      else if (foundHighLevelUsers.length) {
        const usrIndx = Math.floor(Math.random() * foundHighLevelUsers.length);
        const userIDs = foundHighLevelUsers.map((c) => c._id);
        const highLevelUsrId = userIDs[usrIndx];
        userB = highLevelUsrId;
        break;
      }
      else {
        low--;
        high++;
      }
    }

    if (userB.length === 0) {
      const userIndex2 = Math.floor(Math.random() * userIds.length);
      userB = userIds[userIndex2];
    }

    //...............select question based on level........................................................................
    let questions = await findQuestionLevel(userA);
    if (!Array.isArray(questions) || questions.length === 0) {
      const resp = {
        status: false,
        message: "No questions found for your specified level",
      };
      return res.status(404).send(resp);
    }

    let topicWiseQuestion = questions.filter(q => q.topic === req.body.topic);
    // if (topicWiseQuestion.length === 0) {
    //   topicWiseQuestion = questions;
    // }

    //................................Select a certain number of unique questions......................................
    const selectedQuestion = selectUniqueQuestions(topicWiseQuestion, projectConfig.challenge.questionCount);

    const questionWithoutAns = selectedQuestion.map(q => {
      const optionsWithoutAns = q?.options?.map(({ option }) => ({ option }));
      if (optionsWithoutAns && q?.options) {
        q.options = optionsWithoutAns;
      }
      return q;
    });
    const userData = {
      fromUser: userId,
      toUser: userB,
      topic: req.body.topic,
      questions: questionWithoutAns,
    }
    const result = await Challenge.create(userData);

    // handle trending challenge
    handleTrendingChallenge(req.body.topic);

    const resp = {
      success: true,
      data: result
    };
    res.status(201).send(resp);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
  }
};

const handleTrendingChallenge = async (topic) => {
  //.................................update the trending model...........................................
  const filter = { topic };
  const update = { $inc: { topicUsed: 1 } };
  const updatedTrendingData = await TrendingModel.findOneAndUpdate(filter, update, { new: true }).lean();

  // If the document does not exist, create it with the initial values
  if (!updatedTrendingData) {
    const trendingData = {
      topic,
      topicUsed: 1
    };
    await TrendingModel.create(trendingData);
  }
}

const getChallenges = async (req, res) => {
  try {
    const userId = req.user._id;
    const challenges = await Challenge.find({ $or: [{ toUser: userId }, { fromUser: userId }] }).sort({ createdAt: -1 }).lean();
    const resp = {
      success: true,
      data: challenges
    };
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
  }
};

const getChallenge = async (req, res) => {
  try {
    const userId = req.user._id;
    const challengeId = req.params.id;
    const challenge = await Challenge.findOne({ _id: challengeId, $or: [{ toUser: userId }, { fromUser: userId }] }).lean();
    if (!challenge) {
      const resp = {
        status: false,
        message: "No Challenge found",
      };
      return res.status(404).send(resp);
    }
    const resp = {
      success: true,
      data: challenge
    };
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
  }
};

module.exports = { createChallenge, getChallenges, getChallenge };