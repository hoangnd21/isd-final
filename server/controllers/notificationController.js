const notification = require('../models/notification');

const addNotification = (req, res) => {
    const date = Date.now()
    notification.create({
        reqUser: req.body.reqUser,
        request: req.body.request,
        read: req.body.read,
        created_at: date
    });
    res.send("1 document created successfully");
};
module.exports.addNotification = addNotification;

const getAllNotification = (req, res) => {
    const getAllNotification = notification.find({}).exec()
        .then((getAllNotification) => {
            if (getAllNotification) {
                res.send(getAllNotification);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllNotification = getAllNotification;

const getOneNotification = (req, res) => {
    const getOneNotification = notification.findById(req.params.id).exec()
        .then((getOneNotification) => {
            if (getOneNotification) {
                res.send(getOneNotification);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneNotification = getOneNotification;

const updateNotification = (req, res) => {
    const updateNotification = notification.findById(req.params.id).exec()
        .then((updateNotification) => {
            if (updateNotification) {
                const newValue = { $set: req.body };
                notification.updateOne(updateNotification, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateNotification = updateNotification;

const deleteNotification = (req, res) => {
    const deleteNotification = notification.findById(req.params.id).exec()
        .then((deleteNotification) => {
            if (deleteNotification) {
                notification.deleteOne(deleteNotification, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteNotification = deleteNotification;

const getUnReadNotification = (req, res) => {
    const getUnReadNotification = notification.find({ read: false }).exec()
        .then((getUnReadNotification) => {
            if (getUnReadNotification) {
                res.send(getUnReadNotification);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getUnReadNotification = getUnReadNotification;