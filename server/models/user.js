const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userShema = new Schema({
    code: String,
    username: String,
    password: String,
    role:
    {
        name: String,
        level: Number
    }
});

const user = mongoose.model('users', userShema);
module.exports = user;

// user.create({
//     "username": "a",
//     "password": "1111"
// })