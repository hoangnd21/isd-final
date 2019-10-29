const batch = require('../models/batch');

const addBatch = (req, res) => {
    const now = Date.now()
    batch.create({
        code: req.body.code,
        date: req.body.date,
        provider: req.body.provider,
        contactPerson: req.body.contactPerson,
        note: req.body.note,
        create_at: now
    });
    res.send("Batch is successfully created");
};
module.exports.addBatch = addBatch;

const getAllBatch = (req, res) => {
    const getAllBatch = batch.find({}).sort({ created_at: -1 }).exec()
        .then((getAllBatch) => {
            if (getAllBatch) {
                res.send(getAllBatch);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllBatch = getAllBatch;

const getOneBatch = (req, res) => {
    const getOneBatch = batch.findById(req.params.id).exec()
        .then((getOneBatch) => {
            if (getOneBatch) {
                res.send(getOneBatch);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneBatch = getOneBatch;

const updateBatch = (req, res) => {
    const updateBatch = batch.findById(req.params.id).exec()
        .then((updateBatch) => {
            if (updateBatch) {
                const newValue = { $set: req.body };
                batch.updateOne(updateBatch, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("Batch is successfully updated");
            }
        })
};
module.exports.updateBatch = updateBatch;

const deleteBatch = (req, res) => {
    const deleteBatch = batch.findById(req.params.id).exec()
        .then((deleteBatch) => {
            if (deleteBatch) {
                batch.deleteOne(deleteBatch, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("Batch is successfully deleted");
            }
        })
};
module.exports.deleteBatch = deleteBatch; 