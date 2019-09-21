const provideBatch = require('../models/provideBatch');

const addProvideBatch = (req, res) => {
    provideBatch.create({
        code: req.body.code,
        date: req.body.date,
        provider: req.body.provider,
        contactPerson: req.body.contactPerson,
        note: req.body.note
    });
    res.send("1 document created successfully");
};
module.exports.addProvideBatch = addProvideBatch;

const getAllProvideBatch = (req, res) => {
    const getAllProvideBatch = provideBatch.find({}).exec()
        .then((getAllProvideBatch) => {
            if (getAllProvideBatch) {
                res.send(getAllProvideBatch);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllProvideBatch = getAllProvideBatch;

const getOneProvideBatch = (req, res) => {
    const getOneProvideBatch = provideBatch.findById(req.params.id).exec()
        .then((getOneProvideBatch) => {
            if (getOneProvideBatch) {
                res.send(getOneProvideBatch);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneProvideBatch = getOneProvideBatch;

const updateProvideBatch = (req, res) => {
    const updateProvideBatch = provideBatch.findById(req.params.id).exec()
        .then((updateProvideBatch) => {
            if (updateProvideBatch) {
                const newValue = { $set: req.body };
                provideBatch.updateOne(updateProvideBatch, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateProvideBatch = updateProvideBatch;

const deleteProvideBatch = (req, res) => {
    const deleteProvideBatch = provideBatch.findById(req.params.id).exec()
        .then((deleteProvideBatch) => {
            if (deleteProvideBatch) {
                provideBatch.deleteOne(deleteProvideBatch, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteProvideBatch = deleteProvideBatch; 