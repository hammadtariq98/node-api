const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatSchema = new Schema({
    msg: {
        type: String
    }
},{ timestamps: true });

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;

