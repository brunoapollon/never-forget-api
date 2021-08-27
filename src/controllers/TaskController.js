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
      return response.status(200).json(tasks);
    } catch (err) {}
  },
};
