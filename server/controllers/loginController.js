const users = require('../models/user');
const bcrypt = require('bcrypt')
const session = require('express-session')
const login = (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const loginResult = users.findOne({ username: user }).exec()
        .then((loginResult) => {
            if (loginResult) {
                bcrypt.compare(pass, loginResult.password, function (err, result) {

                    if (result === true) {
                        res.send(loginResult);
                    }
                })
            }
        });


}
module.exports.login = login;