const user = require('../models/user');

const addUser = (req, res) => {
    user.create({
        code: req.body.code,
        username: req.body.username,
        password: req.body.password
    });
    res.send("1 document created successfully");
};
module.exports.addUser = addUser;

const getAllUser = (req, res) => {
    const getAllUser = user.find({}).exec()
        .then((getAllUser) => {
            if (getAllUser) {
                res.send(getAllUser);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllUser = getAllUser;

const getOneUser = (req, res) => {
    const getOneUser = user.findById(req.params.id).exec()
        .then((getOneUser) => {
            if (getOneUser) {
                res.send(getOneUser);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneUser = getOneUser;

const updateUser = (req, res) => {
    const updateUser = user.findById(req.params.id).exec()
        .then((updateUser) => {
            if (updateUser) {
                const newValue = { $set: req.body };
                user.updateOne(updateUser, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateUser = updateUser;

const deleteUser = (req, res) => {
    const deleteUser = user.findById(req.params.id).exec()
        .then((deleteUser) => {
            if (deleteUser) {
                user.deleteOne(deleteUser, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteUser = deleteUser; 