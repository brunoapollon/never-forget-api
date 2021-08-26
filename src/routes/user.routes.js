const { Router } = require('express');
const userController = require('../controllers/UseerController');
const AuthenticationController = require('../controllers/AuthenticationController');

const userRouter = Router();

userRouter.post('/', userController.store);
userRouter.post('/authentication', AuthenticationController.store);

module.exports = userRouter;
