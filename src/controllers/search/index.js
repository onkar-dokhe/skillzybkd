// Import necessary modules
const UserModel = require("../../models/user");

const getInterviewees = async (req, res) => {
    try {
        const { city, college, topic } = req.query;
        const query = {};
        if (topic) {
            query['skill'] = { $elemMatch: { subject: topic } };
        }
        if (city) {
            query['city'] = city;
        }
        if (college) {
            query['college'] = college;
        }
        const users = await UserModel.find(
            query,
            { password: 0, role: 0, fcmToken: 0 },
        );
        const resp = {
            success: true,
            data: users
        };
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
    }
};

module.exports = { getInterviewees };
