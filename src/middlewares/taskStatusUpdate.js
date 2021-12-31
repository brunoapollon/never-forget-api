const Task = require('../models/Task');
const Notification = require('../models/Notification');
const { io } = require('../app');

async function taskStatusUpdate(request, response, next) {
  const { user_id } = request;

  const tasks = await Task.find({ user_id });

  tasks.map(async task => {
    const taskWithNotification = await Notification.find({
      task_id: task.id,
    });
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
      if (taskWithNotification.length === 0)
        await Notification.create({
          title: 'Tarefa próxima',
          description: 'Você tem atividades proximas, clique para vizualizar!',
          user_id: user_id,
          task_id: task.id,
        });
    } else if (difference > 0 && difference < 1) {
      await Task.collection.updateOne(
        { id: task.id },
        {
          $set: { status: 'urgency' },
          $currentDate: { updatedAt: true },
        },
      );
      if (taskWithNotification.length >= 0) {
        const notification = await Notification.create({
          title: 'Tarefa com urgência',
          description:
            'Você tem atividades que estão perto de expirar, clique para vizualizar!',
          user_id: user_id,
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

module.exports = taskStatusUpdate;
