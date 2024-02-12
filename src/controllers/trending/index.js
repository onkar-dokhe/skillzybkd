const TrendingModel = require("../../models/trending");

const getTrendingTopic = async (req, res) => {
    try {
        const data = await TrendingModel.find({}).sort({ topicUsed: -1 }).lean();
        const resp = {
            success: true,
            data: data
        };
        return res.status(200).send(resp);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
    }
};

module.exports = { getTrendingTopic };