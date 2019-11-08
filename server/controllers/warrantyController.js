const warranty = require('../models/warranty');

const addWarranty = (req, res) => {
    const now = Date.now()
    warranty.create({
        startDate: req.body.startDate,
        device: req.body.device,
        type: req.body.type,
        completionEstimation: req.body.completionEstimation,
        note: req.body.note,
        created_at: now
    });
    res.send("1 document created successfully");
};
module.exports.addWarranty = addWarranty;

const getAllWarranty = (req, res) => {
    const getAllWarranty = warranty.find({}).sort({ created_at: -1 }).exec()
        .then((getAllWarranty) => {
            if (getAllWarranty) {
                res.send(getAllWarranty);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllWarranty = getAllWarranty;

const getOneWarranty = (req, res) => {
    const getOneWarranty = warranty.findById(req.params.id).exec()
        .then((getOneWarranty) => {
            if (getOneWarranty) {
                res.send(getOneWarranty);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneWarranty = getOneWarranty;

const updateWarranty = (req, res) => {
    const updateWarranty = warranty.findById(req.params.id).exec()
        .then((updateWarranty) => {
            if (updateWarranty) {
                const newValue = { $set: req.body };
                warranty.updateOne(updateWarranty, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateWarranty = updateWarranty;

const deleteWarranty = (req, res) => {
    const deleteWarranty = warranty.findById(req.params.id).exec()
        .then((deleteWarranty) => {
            if (deleteWarranty) {
                warranty.deleteOne(deleteWarranty, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteWarranty = deleteWarranty; 