import { hash } from 'bcryptjs';
import { AppError } from '../errors/AppError';
import { User } from '../models/User';
import { Notification } from '../models/Notification';
import { Task } from '../models/Task';

export default class UserController {
  async store(request, response) {
    const { name, email, password } = request.body;
    const passwordHashed = await hash(password, 8);
    try {
      const user = await User.create({ name, email, password: passwordHashed });
      return response.status(201).json(user);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }

  async show(request, response) {
    const { user_id } = request;

    try {
      const findUser = await User.findOne({ id: user_id });

      return response.status(200).json(findUser);
    } catch (err) {
      throw new AppError('failed to show data', err.statusCode);
    }
  }

  async update(request, response) {
    const { user_id } = request;
    const { name, email } = request.body;
    try {
      const userUpdated = await User.findOneAndUpdate(
        { id: user_id },
        { name, email },
        {
          new: true,
        },
      );
      return response.status(201).json(userUpdated);
    } catch (err) {
      throw new AppError('failed to update', err.statusCode);
    }
  }

  async delete(request, response) {
    const { user_id } = request;

    try {
      await Notification.deleteMany({ user_id });

      await Task.deleteMany({ user_id });

      await User.deleteOne({ id: user_id });

      return response.status(201).json({ message: 'user has been deleted' });
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  }
}
