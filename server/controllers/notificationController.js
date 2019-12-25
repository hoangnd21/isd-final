const notification = require('../models/notification');

const addNotification = (req, res) => {
    const date = Date.now()
    notification.create({
        type: req.body.type,
        sender: req.body.sender,
        equipment: req.body.equipment,
        msg: req.body.msg,
        unread:true,
        created_at: date
    });
    res.send("Notification is successfully created");
};
module.exports.addNotification = addNotification;

const getAllNotification = (req, res) => {
    const getAllNotification = notification.find({}).sort({ created_at: -1 }).exec()
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
    const getOneNotification = notification.find(req.query).exec()
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
                res.send("Notification is successfully updated");
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
                res.send("Notification is successfully deleted");
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