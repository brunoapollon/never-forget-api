import { Notification } from '../models/Notification';

export default class UpdateStatusNotificationController {
  async update(request, response) {
    const { notification_id } = request.params;

    await Notification.findOneAndUpdate(
      { id: notification_id },
      { read: true },
    );

    return response
      .status(201)
      .json({ message: 'Successfully updated notification' });
  }
}
