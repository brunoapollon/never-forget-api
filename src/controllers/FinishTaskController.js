import { AppError } from '../errors/AppError';
import { Task } from '../models/Task';

export default class FinishTaskController {
  async update(request, response) {
    const { task_id } = request.params;

    const taskUpdate = await Task.updateOne(
      { id: task_id },
      { finished: true },
      { new: true },
    );

    if (!taskUpdate) throw new AppError('Task not found', 404);

    return response.status(201).json({ message: 'Update successfully' });
  }
}
