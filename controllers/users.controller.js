const { listeners } = require("../models/user");
const User = require("../models/user");

async function createUser(req,res){
    try {
        let userCreated =  new User(req.body)
        await userCreated.save()
        res.status(200).send({success:true, message: "User created successful", data: userCreated})
    } catch (err) {
        if (err.name == 'ValidationError') {
            res.status(422).json({ success: false, message: "Failed to create user", error: err.message });
        } else {
            res.status(500).json({ success:false, message: "Failed to create user", error: err.message })
        }
    }
}

module.exports = {
    createUser,
}