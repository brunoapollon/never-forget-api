import { Router } from 'express';

import { userRouter } from './routes/user.routes';
import { taskRouter } from './routes/task.routes';
import { notificationRouter } from './routes/notification.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/tasks', taskRouter);
routes.use('/notifications', notificationRouter);

export default routes;
