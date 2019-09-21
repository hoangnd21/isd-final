const errorReport = require('../models/errorReport');

const addErrorReport = (req, res) => {
    errorReport.create({
        user: req.body.user,
        device: req.body.device,
        option: rq.body.option,
        reportDate: req.body.reportDate,
        note: req.body.note
    });
    res.send("1 document created successfully");
};
module.exports.addErrorReport = addErrorReport;

const getAllErrorReport = (req, res) => {
    const getAllErrorReport = errorReport.find({}).exec()
        .then((getAllErrorReport) => {
            if (getAllErrorReport) {
                res.send(getAllErrorReport);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllErrorReport = getAllErrorReport;

const getOneErrorReport = (req, res) => {
    const getOneErrorReport = errorReport.findById(req.params.id).exec()
        .then((getOneErrorReport) => {
            if (getOneErrorReport) {
                res.send(getOneErrorReport);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneErrorReport = getOneErrorReport;

const updateErrorReport = (req, res) => {
    const updateErrorReport = errorReport.findById(req.params.id).exec()
        .then((updateErrorReport) => {
            if (updateErrorReport) {
                const newValue = { $set: req.body };
                errorReport.updateOne(updateErrorReport, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateErrorReport = updateErrorReport;

const deleteErrorReport = (req, res) => {
    const deleteErrorReport = errorReport.findById(req.params.id).exec()
        .then((deleteErrorReport) => {
            if (deleteErrorReport) {
                errorReport.deleteOne(deleteErrorReport, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteErrorReport = deleteErrorReport; 