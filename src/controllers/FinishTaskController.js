const Task = require('../models/Task');

module.exports = {
  async update(request, response) {
    const { task_id } = request.params;

    const taskUpdate = await Task.updateOne(
      { id: task_id },
      { finished: true },
      { new: true },
    );

    if (!taskUpdate) throw new Error('Task not found');

    return response.status(200).json({ message: 'Update successfully' });
  },
};