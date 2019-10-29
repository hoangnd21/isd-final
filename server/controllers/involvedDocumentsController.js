const involvedDocuments = require('../models/involvedDocuments');

const addInvolvedDocuments = (req, res) => {
    const now = Date.now()
    involvedDocuments.create({
        code: req.body.code,
        name: req.body.name,
        attachedFile: req.body.attachedFile,
        belongedDevice: req.body.belongedDevice,
        note: req.body.note,
        create_at: now
    });
    res.send("Document is successfully created");
};
module.exports.addInvolvedDocuments = addInvolvedDocuments;

const getAllInvolvedDocuments = (req, res) => {
    const getAllInvolvedDocuments = involvedDocuments.find({}).sort({ created_at: -1 }).exec()
        .then((getAllInvolvedDocuments) => {
            if (getAllInvolvedDocuments) {
                res.send(getAllInvolvedDocuments);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllInvolvedDocuments = getAllInvolvedDocuments;

const getOneInvolvedDocuments = (req, res) => {
    const getOneInvolvedDocuments = involvedDocuments.findById(req.params.id).exec()
        .then((getOneInvolvedDocuments) => {
            if (getOneInvolvedDocuments) {
                res.send(getOneInvolvedDocuments);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneInvolvedDocuments = getOneInvolvedDocuments;

const updateInvolvedDocuments = (req, res) => {
    const updateInvolvedDocuments = involvedDocuments.findById(req.params.id).exec()
        .then((updateInvolvedDocuments) => {
            if (updateInvolvedDocuments) {
                const newValue = { $set: req.body };
                involvedDocuments.updateOne(updateInvolvedDocuments, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("Document is successfully updated");
            }
        })
};
module.exports.updateInvolvedDocuments = updateInvolvedDocuments;

const deleteInvolvedDocuments = (req, res) => {
    const deleteInvolvedDocuments = involvedDocuments.findById(req.params.id).exec()
        .then((deleteInvolvedDocuments) => {
            if (deleteInvolvedDocuments) {
                involvedDocuments.deleteOne(deleteInvolvedDocuments, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("Document is successfully deleted");
            }
        })
};
module.exports.deleteInvolvedDocuments = deleteInvolvedDocuments; 