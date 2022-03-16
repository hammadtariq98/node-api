const User = require("../models/user");
const utils = require("../utills");
const cloudinary = require('cloudinary').v2
const fs = require('fs');

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

async function updateUser(req,res){
    try {
        const { id } = req.params
        await User.updateOne({"_id": id },req.body)
        res.status(200).send({success:true, message: "User updated successful"})
    } catch (err) {
        res.status(500).json({ success:false, message: "Failed to update user", error: err.message })
    }
}

async function getUserList(req,res){
    try {
        const users = await User.find({})
        res.status(200).send({success:true, message: "User updated successful", data: users})
    } catch (err) {
        res.status(500).json({ success:false, message: "Failed to update user", error: err.message })
    }
}

async function deleteUser(req,res){
    try {
        const { id } = req.params
        const deletedUser = await User.deleteOne({"_id": id })
        res.status(200).send({success:true, message: "User deleted successful", data: deletedUser})
    } catch (err) {
        res.status(500).json({ success:false, message: "Failed to update user", error: err.message })
    }
}

async function authenticateUser(req,res){
    try {
        const { email } = req.body
        const user = await User.findOne({ email });
        const token = utils.issueJWT(user) 
        const data =  { user : user,...token}
        res.status(200).json({success:true, message: "User login successful!", data});
        // res.status(200).send({success:true, message: "Authenticated User", data: getUser})
    } catch (err) {
        res.status(500).json({ success:false, message: "Failed to update user", error: err.message })
    }
}

 function uploadFile(req,res){
    try {
        const { file } = req
         cloudinary.uploader.upload(
            file.path,
            { public_id: file.originalname },
            (error, result) => {
            if(result) res.status(200).send(result.url)
            if(error) res.status(400).send(error)
        }).catch( err => res.status(400).send(err));
        fs.unlinkSync(file.path)

    } catch (err) {
        res.status(500).json({ success:false, message: "Failed to upload file", error: err.message })
    }
}

async function uploadMultipleFile(req,res){
    try {
        const { files } = req
        let urlArray =[]
        await Promise.all(files.map(async (file, index) =>{    
            let result = await cloudinary.uploader.upload(
                file.path,
                { public_id: file.originalname.split(".")[0] }
            )
            fs.unlinkSync(file.path)
            urlArray[index]= result.secure_url;
        }))
        console.log("urlArray", urlArray)
        res.status(200).send({ success:false, message: "Successfully to upload files", data: urlArray })
    } catch (err) {
        res.status(500).json({ success:false, message: "Failed to upload file", error: err.message })
    }
}


module.exports = {
    createUser,
    updateUser,
    getUserList,
    deleteUser,
    authenticateUser,
    uploadFile,
    uploadMultipleFile
}