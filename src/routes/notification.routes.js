import { Router } from 'express';

import NotificationController from '../controllers/NotificationController';
import UpdateStatusNotificationController from '../controllers/UpdateStatusNotificationController';

import ensuredAuthentication from '../middlewares/enduredAuthentication';

const notificationController = new NotificationController();
const updateStatusNotificationController =
  new UpdateStatusNotificationController();

const notificationRouter = Router();

notificationRouter.get(
  '/allNotifications',
  ensuredAuthentication,
  notificationController.index,
);

notificationRouter.patch(
  '/updateStatus/:notification_id',
  ensuredAuthentication,
  updateStatusNotificationController.update,
);

export { notificationRouter };
