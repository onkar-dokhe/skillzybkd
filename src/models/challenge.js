const { Schema } = require('mongoose');
const mongoose = require('mongoose');

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
