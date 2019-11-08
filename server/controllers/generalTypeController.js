const generalType = require('../models/generalType');

const addGeneralType = (req, res) => {
    const now = Date.now();
    generalType.create({
        created_at: now,
        label: req.body.label,
        value: req.body.value
    })

    res.send("General type is successfully created");
};
module.exports.addGeneralType = addGeneralType;

const getAllGeneralType = (req, res) => {
    const getAllGEquip = generalType.find({}).sort({ created_at: -1 }).exec()
        .then((getAllGEquip) => {
            if (getAllGEquip) {
                res.send(getAllGEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllGeneralType = getAllGeneralType;

const getOneGeneralType = (req, res) => {
    const getOneGEquip = generalType.findById(req.params.id).exec()
        .then((getOneGEquip) => {
            if (getOneGEquip) {
                res.send(getOneGEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneGeneralType = getOneGeneralType;

const updateGeneralType = (req, res) => {
    const updateGEquipment = generalType.findById(req.params.id).exec()
        .then((updateGEquipment) => {
            if (updateGEquipment) {
                const newValue = { $set: req.body };
                generalType.updateOne(updateGEquipment, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("General type is successfully updated");
            }
        })
};
module.exports.updateGeneralType = updateGeneralType;

const deleteGeneralType = (req, res) => {
    const deleteGEquipment = generalType.findById(req.params.id).exec()
        .then((deleteGEquipment) => {
            if (deleteGEquipment) {
                generalType.deleteOne(deleteGEquipment, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("General type is successfully deleted");
            }
        })
};
module.exports.deleteGeneralType = deleteGeneralType;

const getOneTypeByCode = (req, res) => {
    const getEquip = generalType.findOne({ value: req.params.id }).exec()
        .then((getEquip) => {
            if (getEquip) {
                res.send(getEquip);
            }
            else {
                res.send('fail');

            }
        }
        )
}
module.exports.getOneTypeByCode = getOneTypeByCode;