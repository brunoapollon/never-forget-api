const { Router } = require('express');

const userController = require('../controllers/UseerController');
const AuthenticationController = require('../controllers/AuthenticationController');

const ensuredAuthentication = require('../middlewares/enduredAuthentication');

const userRouter = Router();

userRouter.post('/', userController.store);

userRouter.get('/', ensuredAuthentication, userController.show);

userRouter.post('/authentication', AuthenticationController.store);

module.exports = userRouter;
