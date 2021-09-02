const Notification = require('../models/Notification');

module.exports = {
  async update(request, response) {
    const { notification_id } = request.params;

    await Notification.findOneAndUpdate(
      { id: notification_id },
      { read: true },
    );

    return response
      .status(200)
      .json({ message: 'Successfully updated notification' });
  },
};
