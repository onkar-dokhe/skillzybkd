// Import necessary modules
const UserModel = require("../../models/user");

const getTopThreePlayer = async (req, res) => {
    try {
        const data = await UserModel.find({ role: 'user' }, { password: 0, role: 0, fcmToken: 0 }).sort({ score: -1 }).limit(3).lean();
        const resp = {
            success: true,
            data: data
        };
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
    }
};

const getAllPlayer = async (req, res) => {
    try {
        const userId = req.user._id;
        const data = await UserModel.find({ _id: { $ne: userId }, role: 'user' }, { password: 0, role: 0, fcmToken: 0 }).sort({ score: -1 }).lean();
        const resp = {
            success: true,
            data: data
        };
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
    }
};

module.exports = { getTopThreePlayer, getAllPlayer };
