const mongoose = require('mongoose');

const selfChallengeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },
    topic: {
        type: String,
        required: true,
        index: true
    },
    questions: mongoose.Schema.Types.Mixed,
    result: {
        type: Number,
        default: 0
    },
    submittedTime: Date,
}, { timestamps: true, versionKey: false });

const SelfChallenge = mongoose.model('self-challenge ', selfChallengeSchema);
module.exports = SelfChallenge;
