import { User } from '../../db/models.js';
import AppError from '../../utils/AppError.js';
import generateToken from '../../utils/generateToken.js';

class AuthService {
  static async register(data) {
    const user = await User.create(data);
    const token = generateToken(user.id);

    return { user, token };
  }

  static async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const correctPassword = await user.comparePassword(password);
    if (!correctPassword) {
      throw new AppError('Wrong password', 401);
    }

    const token = generateToken(user.id);

    return { user, token };
  }
}

export default AuthService;
