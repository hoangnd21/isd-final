const users = require('../models/user');
const login = (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const loginResult = users.findOne({ username: user, password: pass }).exec()
        .then((loginResult) => {
            if (loginResult) {
                res.send('success');
            }
            else {
                res.send('fail');
            }
        });
}
module.exports.login = login;