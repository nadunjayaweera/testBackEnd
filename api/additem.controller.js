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
  upload(req, res, function (err) {
    if (err) {
      // Handle error
      console.log(err);
      return res.status(500).send({ error: err.message });
    }

    // Extract form data and file path
    const { name, quantity, price, weight } = req.body;
    const imagePath = req.file.path;

    // Create new item
    const item = new ItemDAO({
      name,
      quantity,
      price,
      weight,
      imagePath,
    });

    // Save item to database
    item.save(function (err, newItem) {
      if (err) {
        // Handle error
        console.log(err);
        return res.status(500).send({ error: err.message });
      }

      // Return success response
      return res.json({ message: "Item added successfully", item: newItem });
    });
  });
};

export default { apiAddItem };
