import ItemDAO from "../dao/additemDAO.js";

export default class AddItemController {
  static async apiAddItem(req, res, next) {
    try {
        const item = {
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            weight: req.body.weight,
            image: {
                data: req.file.buffer, // get the file data from the request object
                contentType: req.file.mimetype // get the file content type from the request object
            }
      };
      console.log("request:");
      console.log(req.file);
        const result = await ItemDAO.addItem(item);
        res.json({ status: "success", id: result.insertedId });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
}
