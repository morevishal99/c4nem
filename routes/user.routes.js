const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userModel } = require("../model/user.model")

//register route for user 
userRoute.post("/register", (req, res) => {
    const { email, name, age, city, gender, is_married, password } = req.body

    try {
        const user = userModel.find({ email })
        console.log(user)
        if(user.length>=1){
            res.status(400).send({ "msg": "User already exist, please login" })
            // return;
        }
        else{
            
                    bcrypt.hash(password, 4, async (err, hash) => {
                        // Store hash in your password DB.
                        const user = new userModel({ email, name, age, city, gender, is_married, password: hash });
                        await user.save()
                        res.status(200).send({ "msg": "new user added" })
                    });

        }

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})


//login route for user 
userRoute.post("/login",async (req, res) => {
    const { email, password } = req.body

    try {
        const user =await userModel.findOne({ email })
        console.log(user)
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                // result == true
                // Store hash in your password DB.
                if (result) {
                    res.status(200).send({ "msg": "login success", "token": jwt.sign({ "userid": user._id }, "vishal") })

                } else {
                    res.status(400).send({ "msg": "wrong details" })
                }

            });

        } 


    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})




module.exports = { userRoute }

