const status = require('../models/status');

const addStatus = (req, res) => {
    const now = Date.now()
    status.create({
        status: req.body.status,
        create_at: now
    });
    res.send("Status is successfully added");
};
module.exports.addStatus = addStatus;

const getAllStatus = (req, res) => {
    const getAllStatus = status.find({}).sort({ created_at: -1 }).exec()
        .then((getAllStatus) => {
            if (getAllStatus) {
                res.send(getAllStatus);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllStatus = getAllStatus;

const getOneStatus = (req, res) => {
    const getOneStatus = status.findById(req.params.id).exec()
        .then((getOneStatus) => {
            if (getOneStatus) {
                res.send(getOneStatus);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneStatus = getOneStatus;

const updateStatus = (req, res) => {
    const updateStatus = status.findById(req.params.id).exec()
        .then((updateStatus) => {
            if (updateStatus) {
                const newValue = { $set: req.body };
                status.updateOne(updateStatus, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("Status is successfully updated");
            }
        })
};
module.exports.updateStatus = updateStatus;

const deleteStatus = (req, res) => {
    const deleteStatus = status.findById(req.params.id).exec()
        .then((deleteStatus) => {
            if (deleteStatus) {
                status.deleteOne(deleteStatus, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("Status is successfully deleted");
            }
        })
};
module.exports.deleteStatus = deleteStatus; 