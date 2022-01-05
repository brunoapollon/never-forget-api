import { compare, hash } from 'bcryptjs';
import { User } from '../models/User';

export default class UpdatePasswordController {
  async update(request, response) {
    const { user_id } = request;
    const { oldPassword, newPassword } = request.body;

    const findUser = await User.findOne({ id: user_id })
      .select('+password')
      .exec();

    const comparePassword = await compare(findUser.password, oldPassword);

    if (!comparePassword) throw new Error('old password is wrong!');

    const passwordHashed = await hash(newPassword, 8);

    await User.findOneAndUpdate({ id: user_id }, { password: passwordHashed });

    return response
      .status(200)
      .json({ message: 'Password updated successfully' });
  }
}
