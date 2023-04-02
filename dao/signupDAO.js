import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let users

export default class UserDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db("myapp").collection("users")
        } catch (e) {
            console.error(`Unable to establish collection handles in UserDAO: ${e}`)
        }
    }

    static async addUser(fname, lname, password, email) {
        try {
            const addDoc = {
                fname: fname,
                lname: lname,
                password: password,
                email: email,
            }
            return await users.insertOne(addDoc)
        } catch (e) {
            console.error(`Unable to add user: ${e}`)
            return { error: e }
        }
    }

    static async createUser(userInfo) {
        const { fname, lname, email, password } = userInfo;
        const user = {
          fname: fname,
          lname: lname,
          email: email.toLowerCase(),
          password: password,
        };
        
        const existingUser = await db.collection("users").findOne({ email: user.email });
        if (existingUser) {
          throw new Error("Email already exists");
        }
      
        const result = await db.collection("users").insertOne(user);
        return result.insertedId;
      }
        

    static async getUserByEmail(email) {
        try {
            return await users.findOne({ email: email })
        } catch (e) {
            console.error(`Unable to get user: ${e}`)
            return { error: e }
        }
    }
}
