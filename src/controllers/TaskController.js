const Task = require('../models/Task');

module.exports = {
  async store(request, response) {
    const { title, description, deadline } = request.body;
    const { user_id } = request;
    let status;
    try {
      const currentDate = new Date();

      let difference = new Date(deadline).getTime() - currentDate.getTime();

      difference = difference / (1000 * 60 * 60);

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

      return response.status(200).json(task);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async index(request, response) {
    const { user_id } = request;

    try {
      const tasks = await Task.find({ user_id });

      return response.status(200).json(tasks);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async show(request, response) {
    const { task_id } = request.params;

    try {
      let findTask = await Task.findOne({ id: task_id });

      const currentDate = new Date();

      let difference = findTask.deadline.getTime() - currentDate.getTime();

      difference = difference / (1000 * 60 * 60);

      if (difference > 5) {
        await Task.collection.updateOne(
          { id: findTask.id },
          {
            $set: { status: 'no urgency' },
            $currentDate: { updatedAt: true },
          },
        );
      } else if (difference > 3) {
        await Task.collection.updateOne(
          { id: findTask.id },
          { $set: { status: 'close' }, $currentDate: { updatedAt: true } },
        );
      } else if (difference > 0 && difference < 1) {
        await Task.collection.updateOne(
          { id: findTask.id },
          {
            $set: { status: 'urgency' },
            $currentDate: { updatedAt: true },
          },
        );
      } else if (difference <= 0) {
        await Task.collection.updateOne(
          { id: findTask.id },
          {
            $set: { status: 'expires' },
            $currentDate: { updatedAt: true },
          },
        );
      }

      findTask = await Task.findOne({ id: task_id });

      return response.status(200).json(findTask);
    } catch (err) {
      throw new Error('task not found');
    }
  },
};
