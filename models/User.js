const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        first: { type: String },
        last: { type: String }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String },
    dateOfBirth: { type: Date },
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },

});

module.exports = mongoose.model("User", userSchema);
