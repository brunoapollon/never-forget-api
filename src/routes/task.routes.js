const { Router } = require('express');

const TaskController = require('../controllers/TaskController');
const FilterByCurrrentDateController = require('../controllers/FilterByCurrrentDateController');
const FinishTaskController = require('../controllers/FinishTaskController');

const ensuredAuthentication = require('../middlewares/enduredAuthentication');
const taskStatusUpdate = require('../middlewares/taskStatusUpdate');

const taskRouter = Router();

taskRouter.post('/', ensuredAuthentication, TaskController.store);

taskRouter.post(
  '/finished/:task_id',
  ensuredAuthentication,
  FinishTaskController.update,
);

taskRouter.get(
  '/allTasks',
  ensuredAuthentication,
  taskStatusUpdate,
  TaskController.index,
);
taskRouter.get(
  '/showTask/:task_id',
  ensuredAuthentication,
  taskStatusUpdate,
  TaskController.show,
);

taskRouter.get(
  '/currentTasks',
  ensuredAuthentication,
  taskStatusUpdate,
  FilterByCurrrentDateController.show,
);

module.exports = taskRouter;
