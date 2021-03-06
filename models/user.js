const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String, 
        required: 'User name is required', 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: true
    },
    email: {
        type: String, 
        unique: true, 
        required: 'Email address is required', 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'is invalid'], 
        index: true
    },
    dob: { 
        type: Date, 
        required: 'DOB is required', 
    },
    phoneNumber: { 
        type: String, 
        required: 'phoneNumber is required', 
    },
    address: { 
        type: String, 
        required: 'Address is required', 
        maxlength: [40, 'Address must be less than 20 characters.'],
    },
    age: Number
},{ timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;

