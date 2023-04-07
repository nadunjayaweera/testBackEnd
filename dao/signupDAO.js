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

    static async addUser(fname, lname, email, password) {
        try {
            const addDoc = {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
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
        
        try {
          const existingUser = await users.findOne({ email: user.email });
          if (existingUser) {
            throw new Error("Email already exists");
          }
      
          const result = await users.insertOne(user);
          return user;
        } catch (e) {
          console.error(`Unable to create user: ${e}`)
          throw new Error(`Unable to create user: ${e.message}`)
        }
    }

    static async getUserByEmail(email) {
        try {
            return await users.findOne({ email: email })
        } catch (e) {
            console.error(`Unable to get user: ${e}`)
            return null
        }
    }
}
