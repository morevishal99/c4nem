const express = require("express")
const { connection } = require("./db")
const { userRoute } = require("./routes/user.routes")
const { postRoute } = require("./routes/post.routes")
const { Authentication} = require("./middleware/Authentication")
const app = express()

app.use(express.json())
app.get("/users", (req, res) => {
    res.send("home")
})
app.use("/users", userRoute)
app.use(Authentication)
app.use("/post", postRoute)

app.listen(8080, async () => {

    try {
        await connection
        console.log("connected to db ")
    } catch (error) {
        console.log('error: ', error);

    }
    console.log("server running on port 8080")
})