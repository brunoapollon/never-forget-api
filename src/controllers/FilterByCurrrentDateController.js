import { Task } from '../models/Task';

export default class FilterByCurrrentDateController {
  async index(request, response) {
    const { user_id } = request;

    const currentDate = new Date();

    const allTasks = await Task.find({ user_id });

    const filterTasks = allTasks.filter(
      task =>
        task.deadline.getFullYear() === currentDate.getFullYear() &&
        task.deadline.getMonth() === currentDate.getMonth() &&
        task.deadline.getDate() === currentDate.getDate(),
    );

    return response.json(filterTasks);
  }
}
