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
};
