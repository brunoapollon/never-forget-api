const { Router } = require('express');

const userRouter = require('./routes/user.routes');

const routes = Router();

routes.use('/users', userRouter);

module.exports = routes;
