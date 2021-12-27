const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

const authConfig = require('../configs/authConfig');
const User = require('../models/User');

module.exports = {
  async store(request, response) {
    const { email, password } = request.body;

    try {
      if (!email || !password) {
        throw new Error('Validation failed');
      }

      const findUser = await User.findOne({ email: email })
        .select('+password')
        .exec();

      if (!findUser) {
        throw new Error('email or password does not match');
      }

      if (!(await compare(password, findUser.password))) {
        throw new Error('email or password does not match');
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

      return response.json({ token, user });
    } catch (err) {
      throw new Error('failed to authentication');
    }
  },
};
