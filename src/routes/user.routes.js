const { Router } = require('express');
const userController = require('../controllers/UseerController');

const userRouter = Router();

userRouter.post('/', userController.store);

module.exports = userRouter;
