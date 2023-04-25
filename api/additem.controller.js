import ItemDAO from "../dao/additemDAO.js";

export default class AddItemController {
  static async apiAddItem(req, res, next) {
    try {
      const item = req.body;
      const result = await ItemDAO.addItem(item);
      if (result.error) {
        throw new Error(result.error);
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
