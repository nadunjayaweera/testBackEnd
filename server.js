import express from "express";
import cors from "cors";
import signup from "./api/signup.route.mjs";
import login from "./api/login.route.mjs"; // import the login route
import getUsers from "./api/users.route.mjs"
import additem from "./api/additem.route.mjs";// import the additem route

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/signup", signup)
app.use("/api/v1/login", login); // add the login route
app.use("/api/v1/users", getUsers); // add the users route
app.use("/api/v1/additem", additem); // add the add
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app;




// Username- nadunmj
// Password- EYO4y6xhMq0PzxDX
// URL- mongodb+srv://nadunmj:<password>@cluster0.idbvi1f.mongodb.net/?retryWrites=true&w=majority
// npx nodemon app.js