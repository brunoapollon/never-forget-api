const { Router } = require('express');

const notificationController = require('../controllers/NotificationController');
const ensuredAuthentication = require('../middlewares/enduredAuthentication');

const notificationRouter = Router();

notificationRouter.get(
  '/allNotifications',
  ensuredAuthentication,
  notificationController.index,
);

module.exports = notificationRouter;
