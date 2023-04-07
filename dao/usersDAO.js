import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class UserDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db("myapp").collection("users");
    } catch (e) {
      console.error(`Unable to establish collection handles in UserDAO: ${e}`);
    }
  }

  static async getUsers() {
    try {
      const cursor = await users.find();
      return cursor.toArray();
    } catch (e) {
      console.error(`Unable to get users: ${e}`);
      return { error: e };
    }
  }
}
