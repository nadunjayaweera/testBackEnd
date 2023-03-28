import app from "./server.cjs"
import mongodb from "mongodb"
import SignupDAO from "./dao/signupDAO.js"

const MongoClient = mongodb.MongoClient

const uri = `mongodb+srv://nadunmj:EYO4y6xhMq0PzxDX@cluster0.idbvi1f.mongodb.net/?retryWrites=true&w=majority`
    // checking pipeline
const port = 8000
    // test pipe line

MongoClient.connect(
        uri, {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
            useNewUrlParser: true
        })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await SignupDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })