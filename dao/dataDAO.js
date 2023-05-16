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
      console.error(`Unable to establish collection handles in DataDAO: ${err}`);
    }
  }

  static async getData() {
    if (!data) {
        throw new Error('DataDAO not initialized');
    }
    try {
      const cursor = await data.findOne({id: "1"});
      const dataValue = cursor.data;
      await data.updateOne({ id: "1" },{ $set: { value: "6" } });
      return cursor;// return only data propery 
    } catch (err) {
      console.error(`Error getting data: ${err}`);
      return { error: err };
    }
  }

  static async addData(temperature, humidity, value) {
    try {
      const updateObj = {};
      if (temperature !== undefined && humidity !== undefined) {
        updateObj.temperature = temperature;
        updateObj.humidity = humidity;
      }
      // Update value only if it is provided
      if (value !== undefined) {
        updateObj.value = value;
      }
      const result = await data.updateOne({ id: "1" }, { $set: updateObj });
      return result.modifiedCount;
    } catch (err) {
      console.error(`Error adding data: ${err}`);
      return { error: err };
    }
  }
}
