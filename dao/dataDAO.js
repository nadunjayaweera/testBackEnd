import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let data;

export default class DataDAO {
  static async injectDB(conn) {
    if (data) {
      return;
    }
    try {
      data = await conn.db("myapp").collection("data");
    } catch (err) {
      console.error(`Unable to establish collection handles in dataDAO: ${err}`);
    }
  }

  static async getData() {
    try {
      const cursor = await data.find({}).toArray();
      return cursor;
    } catch (err) {
      console.error(`Error getting data: ${err}`);
      return { error: err };
    }
  }
}
