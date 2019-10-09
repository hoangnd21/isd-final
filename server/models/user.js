const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userShema = new Schema({
    code: String,
    username: String,
    gender: String,
    nationality: String,
    idCard: String,
    issuedDate: Date,
    issuedPlace: String,
    mobilePhone: String,
    personalEmail: String,
    officePhone: String,
    officeMail: String,
    DOB: Date,
    maritalStatus: String,
    address: String,
    isActivated: Boolean,
    password: String,
    rank: String,
    function: String,
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