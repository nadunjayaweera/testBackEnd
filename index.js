import app from "./server.js";
import mongodb from "mongodb";
import SignupDAO from "./dao/signupDAO.js";
import LoginDAO from "./dao/loginDAO.js"; // add import for login DAO
import loginRoutes from "./api/login.route.mjs"; // add import for login routes


const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://nadunmj:EYO4y6xhMq0PzxDX@cluster0.idbvi1f.mongodb.net/?retryWrites=true&w=majority`;
const port = 8080;

MongoClient.connect(uri, {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true,
    })
    .catch((err) => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async (client) => {
        await SignupDAO.injectDB(client);
        await LoginDAO.injectDB(client); // inject login DAO
        // await UsersDAO.injectDB(client); // inject user
        app.use("/login", loginRoutes); // mount login routes
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
        
    });
