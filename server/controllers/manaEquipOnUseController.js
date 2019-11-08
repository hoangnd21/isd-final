const manaEquipOnUse = require('../models/manaEquipOnUse');

const addManaEquipOnUse = (req, res) => {
    const now = Date.now()
    manaEquipOnUse.create({
        device: req.body.device,
        accessories: rq.body.accessories,
        startDate: req.body.startDate,
        note: req.body.note,
        created_at: now
    });
    res.send("Entry is successfully created");
};
module.exports.addManaEquipOnUse = addManaEquipOnUse;

const getAllManaEquipOnUse = (req, res) => {
    const getAllManaEquipOnUse = manaEquipOnUse.find({}).sort({ created_at: -1 }).exec()
        .then((getAllManaEquipOnUse) => {
            if (getAllManaEquipOnUse) {
                res.send(getAllManaEquipOnUse);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllManaEquipOnUse = getAllManaEquipOnUse;

const getOneManaEquipOnUse = (req, res) => {
    const getOneManaEquipOnUse = manaEquipOnUse.findById(req.params.id).exec()
        .then((getOneManaEquipOnUse) => {
            if (getOneManaEquipOnUse) {
                res.send(getOneManaEquipOnUse);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneManaEquipOnUse = getOneManaEquipOnUse;

const updateManaEquipOnUse = (req, res) => {
    const updateManaEquipOnUse = manaEquipOnUse.findById(req.params.id).exec()
        .then((updateManaEquipOnUse) => {
            if (updateManaEquipOnUse) {
                const newValue = { $set: req.body };
                manaEquipOnUse.updateOne(updateManaEquipOnUse, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("Entry is successfully updated");
            }
        })
};
module.exports.updateManaEquipOnUse = updateManaEquipOnUse;

const deleteManaEquipOnUse = (req, res) => {
    const deleteManaEquipOnUse = manaEquipOnUse.findById(req.params.id).exec()
        .then((deleteManaEquipOnUse) => {
            if (deleteManaEquipOnUse) {
                manaEquipOnUse.deleteOne(deleteManaEquipOnUse, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("Entry is successfully created deleted");
            }
        })
};
module.exports.deleteManaEquipOnUse = deleteManaEquipOnUse; 