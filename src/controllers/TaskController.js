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
      const tasks = await Task.find({ user_id });

      const tasksMap = tasks.map(task => {
        const currentDate = new Date();
        let difference = task.deadline.getTime() - currentDate.getTime();
        difference = difference / (60 * 60);
        if (difference > 5) {
          task.status = 'no urgency';
        } else if (difference > 3) {
          task.status = 'close';
        } else if (difference > 1 || difference < 1) {
          task.status = 'ugercy';
        } else if (difference <= 0) {
          task.status = 'expires';
        }
        return task;
      });
      return response.status(200).json(tasksMap);
    } catch (err) {}
  },
};
