const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userShema = new Schema({
    username: String,
    password: String
});

const user = mongoose.model('users', userShema);
module.exports = user;

// user.create({
//     "username": "a",
//     "password": "1111"
// })