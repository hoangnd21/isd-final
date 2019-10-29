const user = require('../models/user');
const bcrypt = require('bcrypt')
const addUser = (req, res) => {
    const now = Date.now();
    if (req.body.code && req.body.username && req.body.password && req.body.level && req.body.passwordConf) {
        if (req.body.password === req.body.passwordConf) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return next(err);
                }
                req.body.password = hash;
                user.create({
                    code: req.body.code,
                    username: req.body.username,
                    gender: req.body.gender,
                    nationality: req.body.nationality,
                    idCard: req.body.idCard,
                    issuedDate: req.body.issuedDate,
                    issuedPlace: req.body.issuedPlace,
                    mobilePhone: req.body.mobilePhone,
                    personalEmail: req.body.personalEmail,
                    officePhone: req.body.officePhone,
                    officeMail: req.body.officeMail,
                    DOB: req.body.DOB,
                    maritalStatus: req.body.maritalStatus,
                    address: req.body.address,
                    isActivated: req.body.isActivate,
                    password: hash,
                    rank: req.body.rank,
                    function: req.body.function,
                    level: req.body.level,
                    create_at: now,
                    fullname: req.body.fullname
                });
            })
        }

        res.send("1 document created successfully");
    }
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