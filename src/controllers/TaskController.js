const Task = require('../models/Task');

module.exports = {
  async store(request, response) {
    const { title, description, deadline } = request.body;
    try {
      const task = await Task.create({ title, description, deadline });
      return response.status(200).json(task);
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
