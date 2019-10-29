const errorReport = require('../models/errorReport');

const addErrorReport = (req, res) => {
    const now = Date.now()
    errorReport.create({
        user: req.body.user,
        device: req.body.device,
        option: rq.body.option,
        reportDate: req.body.reportDate,
        note: req.body.note,
        create_at: now
    });
    res.send("Report is successfully created");
};
module.exports.addErrorReport = addErrorReport;

const getAllErrorReport = (req, res) => {
    const getAllErrorReport = errorReport.find({}).sort({ created_at: -1 }).exec()
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
                res.send("Report is successfully updated");
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
                res.send("Report is successfully deleted");
            }
        })
};
module.exports.deleteErrorReport = deleteErrorReport; 