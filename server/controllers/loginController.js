const users = require('../models/user');
const bcrypt = require('bcrypt')

const redirectLogin = (req, res, next) => {
    var a = req.session.user;
    if (a) {
        res.send(req.session.user);
    }
    else {
        res.send('Invalid login. Please try again');
    }
}
module.exports.redirectLogin = redirectLogin;


const login = (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    //const sess = req.session;
    const loginResult = users.findOne({ username: user }).exec()
        .then((loginResult) => {
            if (loginResult) {
                bcrypt.compare(pass, loginResult.password, function (err, result) {
                    if (result === true) {
                        req.session.user = loginResult;
                        res.send(loginResult);
                    }
                    else {
                        res.send("Invalid login. Please try again")
                    }
                })
            }
            else {
                res.send("Invalid username. Please try again");
            }
        });

}
module.exports.login = login;

const logOut = (req, res, next) => {
    if (req.session && req.session.user) {
        req.session = null;
        res.send("loggedOut");

    }
    else {
        res.send("fail to logout");
    }
}
module.exports.logOut = logOut;