const Task = require('../models/Task');

module.exports = {
  async index(request, response) {
    const { statusCode } = request.params;
    const { user_id } = request;

    let status = '';

    if (statusCode == 1) {
      status = 'no urgency';
    } else if (statusCode == 2) {
      status = 'close';
    } else if (statusCode == 3) {
      status = 'urgency';
    } else if (statusCode == 4) {
      status = 'expires';
    }

    const filterTasks = await Task.find({ status, user_id });

    return response.status(200).json(filterTasks);
  },
};
