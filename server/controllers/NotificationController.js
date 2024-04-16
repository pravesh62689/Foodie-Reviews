const Notification = require('../models/Notification');
const User = require('../models/User');

const createNotification = async (req, res) => {
    try {
        const { content, recipientId } = req.body;

        // Validate the recipient
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ error: 'Recipient not found' });
        }

        // Create a new notification
        const notification = new Notification({
            content,
            recipient: recipientId,
        });

        // Save the notification to the database
        await notification.save();

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        // Retrieve all notifications for the authenticated user
        const notifications = await Notification.find({ recipient: userId })
            .populate('recipient', 'name') // Populate the recipient's name
            .sort({ createdAt: -1 }); // Sort notifications by date (newest first)

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const updateNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const { isRead } = req.body;

        // Find the notification and update its read status
        const notification = await Notification.findByIdAndUpdate(notificationId, { isRead }, { new: true });

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;

        // Find and delete the notification
        const notification = await Notification.findByIdAndDelete(notificationId);

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createNotification,
    getNotifications,
    updateNotification,
    deleteNotification,
};
