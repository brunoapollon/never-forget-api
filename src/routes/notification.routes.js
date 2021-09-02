const { Router } = require('express');

const notificationController = require('../controllers/NotificationController');
const updateStatusNotificationController = require('../controllers/UpdateStatusNotificationController');
const ensuredAuthentication = require('../middlewares/enduredAuthentication');

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

module.exports = notificationRouter;
