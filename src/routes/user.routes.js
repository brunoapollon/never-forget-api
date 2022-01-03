import { Router } from 'express';

import UserController from '../controllers/UserController';
import AuthenticationController from '../controllers/AuthenticationController';

import ensuredAuthentication from '../middlewares/enduredAuthentication';

const userRouter = Router();

const userController = new UserController();
const authenticationController = new AuthenticationController();

userRouter.post('/', userController.store);

userRouter.get('/', ensuredAuthentication, userController.show);

userRouter.patch('/update', ensuredAuthentication, userController.update);

userRouter.post('/authentication', authenticationController.store);

export { userRouter };
