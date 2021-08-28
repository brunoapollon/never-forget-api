const { hash } = require('bcryptjs');
const User = require('../models/User');

module.exports = {
  async store(request, response) {
    const { name, email, password } = request.body;
    const passwordHashed = await hash(password, 8);
    try {
      const user = await User.create({ name, email, password: passwordHashed });
      return response.status(200).json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
  async show(request, response) {
    const { user_id } = request;

    try {
      const findUser = await User.findOne({ id: user_id });

      return response.status(200).json(findUser);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async update(request, response) {
    const { user_id } = request;
    const { name, email, password } = request.body;
    let passwordhash;
    if (password) {
      passwordhash = await hash(password, 8);
    }
    await User.findOneAndUpdate(
      { id: user_id },
      { name, email, password: passwordhash },
      {
        new: true,
      },
    );
    return response.status(200).json({ message: 'updated successfully' });
  },
};
