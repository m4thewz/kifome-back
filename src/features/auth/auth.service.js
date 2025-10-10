import { User } from '../../db/models.js'
import generateToken from '../../utils/generateToken.js'

class AuthService {
  static async register(data) {
    const user = await User.create(data);
    const token = generateToken(user.id);

    return { user, token }
  }
  static async login(email, password) {
    const user = await User.findOne({ where: { email } })

    if(!user) {
      return 
    }
  }
}

export default AuthService
