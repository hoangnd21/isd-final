const subType = require('../models/subType');

const addSubType = (req, res) => {
    subType.create({
        value: req.body.value,
        label: req.body.label,
        genTypeId: req.body.genTypeId
    })
    res.send("1 document created successfully");
};
module.exports.addSubType = addSubType;

const getAllSubType = (req, res) => {
    const getAllGSEquip = subType.find({}).exec()
        .then((getAllGSEquip) => {
            if (getAllGSEquip) {
                res.send(getAllGSEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllSubType = getAllSubType;

const getOnesubType = (req, res) => {
    const getOneGSEquip = subType.findById(req.params.id).exec()
        .then((getOneGSEquip) => {
            if (getOneGSEquip) {
                res.send(getOneGSEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOnesubType = getOnesubType;

const updateSubType = (req, res) => {
    const updateGSEquipment = subType.findById(req.params.id).exec()
        .then((updateGSEquipment) => {
            if (updateGSEquipment) {
                const newValue = { $set: req.body };
                subType.updateOne(updateGSEquipment, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateSubType = updateSubType;

const deleteSubType = (req, res) => {
    const deleteGSEquipment = subType.findById(req.params.id).exec()
        .then((deleteGSEquipment) => {
            if (deleteGSEquipment) {
                subType.deleteOne(deleteGSEquipment, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteSubType = deleteSubType; 