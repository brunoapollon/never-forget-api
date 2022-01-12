import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import authConfig from '../configs/authConfig';
import { User } from '../models/User';
import { AppError } from '../errors/AppError';

export default class AuthenticationController {
  async store(request, response) {
    const { email, password } = request.body;

    try {
      if (!email || !password) {
        throw new AppError('Validation failed', 400);
      }

      const findUser = await User.findOne({ email }).select('+password').exec();

      if (!findUser) {
        throw new AppError('email or password does not match', 400);
      }

      if (!(await compare(password, findUser.password))) {
        throw new AppError('email or password does not match', 400);
      }

      const user = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        createdAt: findUser.createdAt,
        updatedAt: findUser.updatedAt,
      };

      const sub = user.id;

      const token = sign({ id: user.id }, authConfig.jwt.secret, {
        subject: sub,
        expiresIn: authConfig.jwt.expiresIn,
      });

      return response.status(201).json({ token, user });
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}
