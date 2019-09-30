const users = require('../models/user');
const bcrypt = require('bcrypt')

const redirectLogin = (req, res, next) => {
    var a = req.sessionID;
    if (a) {
        console.log(a)
        res.send(req.sessionID);
    }
    else {
        res.send(false);
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
                        res.send(req.session.user);
                    }
                })
            }
        });

}
module.exports.login = login;

const logOut = (req, res, next) => {
    if (req.session && req.session.user) {
        req.session.destroy((err) => {
            if (err) throw err
            res.send("loggedOut");
        })
    }
    else {
        res.send("fail to logout");
    }
}
module.exports.logOut = logOut;