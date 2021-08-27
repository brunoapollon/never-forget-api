const { Router } = require('express');

const TaskController = require('../controllers/TaskController');
const ensuredAuthentication = require('../middlewares/enduredAuthentication');

const taskRouter = Router();

taskRouter.post('/', ensuredAuthentication, TaskController.store);

module.exports = taskRouter;
