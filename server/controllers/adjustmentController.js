const adjustment = require('../models/adjustment');

const addAdjustment = (req, res) => {
    const now = Date.now()
    adjustment.create({
        startDate: req.body.startDate,
        device: req.body.device,
        type: req.body.type,
        completionEstimation: req.body.completionEstimation,
        note: req.body.note,
        create_at: now
    });
    res.send("1 document created successfully");
};
module.exports.addAdjustment = addAdjustment;

const getAllAdjustment = (req, res) => {
    const getAllAdjustment = adjustment.find({}).exec()
        .then((getAllAdjustment) => {
            if (getAllAdjustment) {
                res.send(getAllAdjustment);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllAdjustment = getAllAdjustment;

const getOneAdjustment = (req, res) => {
    const getOneAdjustment = adjustment.findById(req.params.id).exec()
        .then((getOneAdjustment) => {
            if (getOneAdjustment) {
                res.send(getOneAdjustment);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneAdjustment = getOneAdjustment;

const updateAdjustment = (req, res) => {
    const updateAdjustment = adjustment.findById(req.params.id).exec()
        .then((updateAdjustment) => {
            if (updateAdjustment) {
                const newValue = { $set: req.body };
                adjustment.updateOne(updateAdjustment, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateAdjustment = updateAdjustment;

const deleteAdjustment = (req, res) => {
    const deleteAdjustment = adjustment.findById(req.params.id).exec()
        .then((deleteAdjustment) => {
            if (deleteAdjustment) {
                adjustment.deleteOne(deleteAdjustment, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteAdjustment = deleteAdjustment; 