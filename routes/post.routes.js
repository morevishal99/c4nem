const express = require("express");
const postRoute = express.Router();
const jwt = require("jsonwebtoken")
const { postModel } = require("../model/post.model")

//route for adding post 
postRoute.post("/add", async (req, res) => {

    try {
        const post = new postModel(req.body);
        await post.save()
        res.status(200).send({ "msg": "new post added " })

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})


// route for getting post
postRoute.get("/", async (req, res) => {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "vishal")

    try {
        if (decoded) {
            const post = await postModel.find({ "userid": decoded.userid })
            res.status(200).send(post)

        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})

postRoute.patch("/update/:id", async (req, res) => {
    const paylaod=req.body
    try {
        const post = await postModel.findByIdAndUpdate({ "userid": req.params.userid },paylaod)
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})
postRoute.delete("/delete/:id", async (req, res) => {
    try {
        const post = await postModel.findByIdAndDelete({ "userid": req.params.userid })
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


module.exports = { postRoute }

