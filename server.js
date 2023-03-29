const express = require("express");
const cors = require("cors");
import signup from "./api/signup.route.mjs"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/signup", signup)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app



// Username- nadunmj
// Password- EYO4y6xhMq0PzxDX
// URL- mongodb+srv://nadunmj:<password>@cluster0.idbvi1f.mongodb.net/?retryWrites=true&w=majority
// npx nodemon app.js