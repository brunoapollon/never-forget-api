import { Task } from '../models/Task';

export default class FilterByTaskStatusController {
  async index(request, response) {
    const { status_code } = request.params;
    const { user_id } = request;

    let status = '';

    if (status_code === '1') {
      status = 'no urgency';
    }
    if (status_code === '2') {
      status = 'close';
    }
    if (status_code === '3') {
      status = 'urgency';
    }
    if (status_code === '4') {
      status = 'expires';
    }

    const filterTasks = await Task.find({ user_id, status });

    return response.status(200).json(filterTasks);
  }
}
