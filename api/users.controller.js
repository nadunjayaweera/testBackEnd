import UserDAO from "../dao/usersDAO.js";

export default class UsersController {
  static async apiGetUsers(req, res, next) {
    try {
      const users = await UserDAO.getUsers();
      res.json(users);
    } catch (e) {
      console.error(`Unable to get users: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}
