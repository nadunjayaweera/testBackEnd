import SignupDAO from "../dao/signupDAO.js";

export default class SignupController {
  static async apiSignup(req, res, next) {
    try {
      const { fname, lname, email,password } = req.body;
      const result = await SignupDAO.createUser(fname, lname, email, password);
      if (result.error) {
        throw new Error(result.error);
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
