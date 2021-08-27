const { Router } = require('express');

const userRouter = require('./routes/user.routes');
const taskRouter = require('./routes/task.routes');

const routes = Router();

routes.use('/users', userRouter);
routes.use('/tasks', taskRouter);

module.exports = routes;
