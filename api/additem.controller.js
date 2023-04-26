import ItemDAO from "../dao/additemDAO.js";
import multer from "multer";

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// Initialize upload
const upload = multer({ storage: storage }).single("image");

// Define controller function to add item to database
const apiAddItem = (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      // Handle error
      console.log(err);
      return res.status(500).send({ error: err.message });
    }

    try {
    const image = req.files && req.files[0];
    const { name, quantity, price, weight } = req.body;
      // Create new item
      const newItem = {
        name,
        quantity,
        price,
        weight,
        image: image ? image.path: null,
      };

      // console.log("Item list is:");
      // console.log(newItem);
      
      // Save item to database
      const result = await ItemDAO.addItem(newItem);

      // Return success response
      return res.json({ message: "Item added successfully", item: result.ops[0] });
    } catch (e) {
      // Handle error
      console.error(`Unable to add item: ${e}`);
      return res.status(500).send({ error: e.message });
    }
  });
};

export default { apiAddItem };
