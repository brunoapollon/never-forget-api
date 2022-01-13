import { Router } from 'express';

import UserController from '../controllers/UserController';
import AuthenticationController from '../controllers/AuthenticationController';
import UpdatePasswordController from '../controllers/UpdatePasswordController';

import ensuredAuthentication from '../middlewares/enduredAuthentication';

const userRouter = Router();

const userController = new UserController();
const authenticationController = new AuthenticationController();
const updatePasswordController = new UpdatePasswordController();

userRouter.post('/', userController.store);

userRouter.get('/', ensuredAuthentication, userController.show);

userRouter.patch('/update', ensuredAuthentication, userController.update);

userRouter.put(
  '/update/password',
  ensuredAuthentication,
  updatePasswordController.update,
);

userRouter.post('/authentication', authenticationController.store);

userRouter.delete(
  '/delete_account',
  ensuredAuthentication,
  userController.delete,
);

export { userRouter };
