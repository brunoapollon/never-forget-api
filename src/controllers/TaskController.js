import { Task } from '../models/Task';
import { io } from '../app';
import { AppError } from '../errors/AppError';

export default class TaskController {
  async store(request, response) {
    const { title, description, deadline } = request.body;
    const { user_id } = request;
    let status = '';
    try {
      const currentDate = new Date();

      let difference = new Date(deadline).getTime() - currentDate.getTime();

      difference /= 1000 * 60 * 60;

      if (difference > 5) {
        status = 'no urgency';
      } else if (difference > 3) {
        status = 'close';
      } else if (difference > 0 && difference < 1) {
        status = 'urgency';
      } else if (difference <= 0) {
        throw new AppError('invalid date', 400);
      }

      const task = await Task.create({
        title,
        description,
        deadline,
        user_id,
        status,
      });

      if (!task) throw new AppError('Failed to create task', 400);

      io.emit('new_task', task);

      return response.status(201).json(task);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }

  async index(request, response) {
    const { user_id } = request;

    try {
      const tasks = await Task.find({ user_id });

      return response.status(200).json(tasks);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }

  async show(request, response) {
    const { task_id } = request.params;

    try {
      const findTask = await Task.findOne({ id: task_id });

      if (!findTask) throw new AppError('Task does not found', 404);

      return response.status(200).json(findTask);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }

  async update(request, response) {
    const { task_id } = request.params;
    const { title, description, deadline } = request.body;
    const { user_id } = request;

    try {
      let status = '';
      if (deadline) {
        const currentDate = new Date();
        let difference = new Date(deadline).getTime() - currentDate.getTime();

        difference /= 1000 * 60 * 60;

        if (difference > 5) {
          status = 'no urgency';
        } else if (difference > 3) {
          status = 'close';
        } else if (difference > 0 && difference < 1) {
          status = 'urgency';
        } else if (difference <= 0) {
          throw new AppError('invalid date', 400);
        }
      }

      const taskUpdate = await Task.findOneAndUpdate(
        { id: task_id },
        {
          title,
          description,
          deadline,
          user_id,
          status,
        },
        {
          new: true,
        },
      );

      return response.status(201).json(taskUpdate);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}
