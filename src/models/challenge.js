const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const questionAndAnswers = new mongoose.Schema({
    questionId: String,
    answer: String,
    _id: false,
});


const challengeSchema = new mongoose.Schema({
    fromUser: {
        type: String,
        required: true,
        index: true
    },
    toUser: {
        type: String,
        required: true,
        index: true
    },
    topic: {
        type: String,
        required: true,
        index: true
    },
    questions: Schema.Types.Mixed,
    result: {
        from: {
            type: Number,
            default: 0
        },
        to: {
            type: Number,
            default: 0
        },
    },
    submissions: {
        from: {
            type: [questionAndAnswers],
            default: null,
        },
        to: {
            type: [questionAndAnswers],
            default: null,
        }
    },
    winner: String,
    submittedBy: {
        fromUser: String,
        toUser: String,
    },
}, {
    timestamps: true,
    versionKey: false,
});

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;
