const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    userid:String
}, { versionKey: false })

const postModel = mongoose.model("userpost", postSchema)

module.exports = { postModel }