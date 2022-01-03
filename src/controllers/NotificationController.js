import { Notification } from '../models/Notification';

export default class NotificationController {
  async index(request, response) {
    const { user_id } = request;

    const notifications = await Notification.find({ user_id });

    return response.status(200).json(notifications);
  }
}
