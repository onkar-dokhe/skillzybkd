const mongoose = require('mongoose')

const questionAndAnswers = new mongoose.Schema({
   question: {
      type: String,
      required: [true, 'Every question should belong to a user']
   },
   answer: {
      type: String,
      required: [true, 'Every answer should belong to a user']
   },
   point: {
      type: Number,
      required: [true, 'Every question should have a point']
   }
})
const answerSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Every answer and question should belong to a user']
   },
   totalPoints: Number,
   scoredPoints: Number,
   answers: {
      type: [questionAndAnswers],
      required: [true, 'Please provide your question and answers']
   },
   submittedAt: {
      type: Date,
      default: Date.now()
   }
})

const Answer = mongoose.model('answer', answerSchema)
module.exports = Answer;