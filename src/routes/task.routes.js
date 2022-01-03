import { Router } from 'express';

import TaskController from '../controllers/TaskController';
import FilterByCurrrentDateController from '../controllers/FilterByCurrrentDateController';
import FinishTaskController from '../controllers/FinishTaskController';
import FilterByTaskStatusController from '../controllers/FilterByTaskStatusController';

import ensuredAuthentication from '../middlewares/enduredAuthentication';
import { taskStatusUpdate } from '../middlewares/taskStatusUpdate';

const taskRouter = Router();

const taskController = new TaskController();
const filterByCurrrentDateController = new FilterByCurrrentDateController();
const finishTaskController = new FinishTaskController();
const filterByTaskStatusController = new FilterByTaskStatusController();

taskRouter.post('/', ensuredAuthentication, taskController.store);

taskRouter.post(
  '/finished/:task_id',
  ensuredAuthentication,
  finishTaskController.update,
);

taskRouter.get(
  '/allTasks',
  ensuredAuthentication,
  taskStatusUpdate,
  taskController.index,
);
taskRouter.get(
  '/showTask/:task_id',
  ensuredAuthentication,
  taskStatusUpdate,
  taskController.show,
);

taskRouter.get(
  '/currentTasks',
  ensuredAuthentication,
  taskStatusUpdate,
  filterByCurrrentDateController.index,
);

taskRouter.get(
  '/filterByStatus/:statusCode',
  ensuredAuthentication,
  taskStatusUpdate,
  filterByTaskStatusController.index,
);

export { taskRouter };
