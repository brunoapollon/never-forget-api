const { Router } = require('express');

const userController = require('../controllers/UserController');
const AuthenticationController = require('../controllers/AuthenticationController');

const ensuredAuthentication = require('../middlewares/enduredAuthentication');

const userRouter = Router();

userRouter.post('/', userController.store);

userRouter.get('/', ensuredAuthentication, userController.show);

userRouter.patch('/update', ensuredAuthentication, userController.update);

userRouter.post('/authentication', AuthenticationController.store);

module.exports = userRouter;
