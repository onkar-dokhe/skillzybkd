const NotificationModel = require("../../models/notification");

const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await NotificationModel.find({
            'receiver.id': userId
        }).sort({ createdAt: -1 }).lean();

        for await (const notification of notifications) {
            if (notification?.sender?.image) {
                notification.sender.image = await getPresignedUrl(notification.sender.image);
            }
            if (notification?.receiver?.image) {
                notification.receiver.image = await getPresignedUrl(notification.receiver.image);
            }
        }

        const resp = {
            success: true,
            data: notifications
        };
        return res.status(200).send(resp);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
    }
};

module.exports = { getNotifications };
