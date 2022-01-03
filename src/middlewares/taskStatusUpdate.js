import { Task } from '../models/Task';
import { Notification } from '../models/Notification';

import { io } from '../app';

async function taskStatusUpdate(request, response, next) {
  const { user_id } = request;

  const tasks = await Task.find({ user_id });

  let notification = {};

  tasks.map(async task => {
    const taskWithNotification = await Notification.find({
      task_id: task.id,
    });
    const currentDate = new Date();

    let difference = task.deadline.getTime() - currentDate.getTime();

    difference /= 1000 * 60 * 60;

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
      if (taskWithNotification.length === 0) {
        notification = await Notification.create({
          title: 'Tarefa próxima',
          description: 'Você tem atividades proximas, clique para vizualizar!',
          user_id,
          task_id: task.id,
        });
      }
    } else if (difference > 0 && difference < 1) {
      await Task.collection.updateOne(
        { id: task.id },
        {
          $set: { status: 'urgency' },
          $currentDate: { updatedAt: true },
        },
      );
      if (taskWithNotification.length >= 0) {
        notification = await Notification.create({
          title: 'Tarefa com urgência',
          description:
            'Você tem atividades que estão perto de expirar, clique para vizualizar!',
          user_id,
          task_id: task.id,
        });

        io.emit('new_notification', notification);
      }
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
  return next();
}

export { taskStatusUpdate };
