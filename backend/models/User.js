//imports Mongoose to help define models & interact with data
const mongoose = require('mongoose');

//define schema (structure of User)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//create and export user model based on schema
module.exports = mongoose.model('User', userSchema);
