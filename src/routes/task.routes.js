const { Router } = require('express');

const TaskController = require('../controllers/TaskController');
const FilterByCurrrentDateController = require('../controllers/FilterByCurrrentDateController');
const ensuredAuthentication = require('../middlewares/enduredAuthentication');

const taskRouter = Router();

taskRouter.post('/', ensuredAuthentication, TaskController.store);

taskRouter.get('/allTasks', ensuredAuthentication, TaskController.index);
taskRouter.get(
  '/showTask/:task_id',
  ensuredAuthentication,
  TaskController.show,
);

taskRouter.get(
  '/currentTasks',
  ensuredAuthentication,
  FilterByCurrrentDateController.show,
);

module.exports = taskRouter;
