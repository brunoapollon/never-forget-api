import { Task } from '../models/Task';
import { io } from '../app';

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
        throw new Error('invalid date');
      }

      const task = await Task.create({
        title,
        description,
        deadline,
        user_id,
        status,
      });

      io.emit('new_task', task);

      return response.status(200).json(task);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async index(request, response) {
    const { user_id } = request;

    try {
      const tasks = await Task.find({ user_id });

      return response.status(200).json(tasks);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async show(request, response) {
    const { task_id } = request.params;

    try {
      const findTask = await Task.findOne({ id: task_id });

      return response.status(200).json(findTask);
    } catch (err) {
      throw new Error('task not found');
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
          throw new Error('invalid date');
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

      return response.status(200).json(taskUpdate);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
