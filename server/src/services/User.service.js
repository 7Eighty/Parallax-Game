const { User } = require("../db/models");

class UserService {
  // * создание пользователя
  static async registerUser({ user_name, email, password }) {
    const user = await User.create({
      user_name,
      email,
      password,
    });
    const result = user.get({ plain: true });
    return result;
  }

  // * Получение юзера по почте
  static async getByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    } else {
      const result = user.get({ plain: true });
      return result;
    }
  }

  // * Получение юзера по ID
  static async getById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    } else {
      const result = user.get({ plain: true });
      return result;
    }
  }
}

module.exports = UserService;
