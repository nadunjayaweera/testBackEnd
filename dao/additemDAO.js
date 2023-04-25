import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let items;

export default class ItemDAO {
  static async injectDB(conn) {
    if (items) {
      return;
    }
    try {
      items = await conn.db("myapp").collection("items");
    } catch (e) {
      console.error(`Unable to establish collection handles in ItemDAO: ${e}`);
    }
  }

  static async addItem(item, file) {
    try {
      const newItem = {
        _id: ObjectId(),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        weight: item.weight,
        image: {
          data: file.buffer,
          contentType: file.mimeType
        }
      };

      return await items.insertOne(newItem);
    } catch (e) {
      console.error(`Unable to add item: ${e}`);
      return { error: e };
    }
  }

  static async getItemById(id) {
    try {
      return await items.findOne({ _id: ObjectId(id) });
    } catch (e) {
      console.error(`Unable to get item: ${e}`);
      return null;
    }
  }
}
