const Task = require('../models/Task');

module.exports = {
  async store(request, response) {
    const { title, description, deadline } = request.body;
    const { user_id } = request;

    try {
      const task = await Task.create({ title, description, deadline, user_id });

      return response.status(200).json(task);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async index(request, response) {
    const { user_id } = request;

    try {
      let tasks = await Task.find({ user_id });

      const tasksMap = tasks.map(async task => {
        const currentDate = new Date();
        let difference = task.deadline.getTime() - currentDate.getTime();
        difference = difference / (1000 * 60 * 60);
        if (difference > 5) {
          await Task.collection.updateOne(
            { id: task.id },
            {
              $set: { status: 'no urgency' },
              $currentDate: { updatedAt: true },
            },
          );
        } else if (difference > 3) {
          await Task.collection.updateOne(
            { id: task.id },
            { $set: { status: 'close' }, $currentDate: { updatedAt: true } },
          );
        } else if (difference > 0 && difference < 1) {
          await Task.collection.updateOne(
            { id: task.id },
            {
              $set: { status: 'urgency' },
              $currentDate: { updatedAt: true },
            },
          );
        } else if (difference <= 0) {
          await Task.collection.updateOne(
            { id: task.id },
            {
              $set: { status: 'expires' },
              $currentDate: { updatedAt: true },
            },
          );
        }
        return task;
      });
      tasks = await Task.find({ user_id });
      return response.status(200).json(tasks);
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
