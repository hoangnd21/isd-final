const subType = require('../models/subType');

const addSubType = (req, res) => {
    const now = Date.now();
    subType.create({
        value: req.body.value,
        label: req.body.label,
        genTypeId: req.body.genTypeId,
        create_at: now
    })
    res.send("Subtype is successfully added");
};
module.exports.addSubType = addSubType;

const getAllSubType = (req, res) => {
    const getAllGSEquip = subType.find({}).sort({ created_at: -1 }).exec()
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

const getOneSubType = (req, res) => {

    const getOneGSEquip = subType.findOne({ value: req.params.id }).exec()
        .then((getOneGSEquip) => {
            if (getOneGSEquip) {
                res.send(getOneGSEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneSubType = getOneSubType;

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
                res.send("Subtype is successfully updated");
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
                res.send("Subtype is successfully deleted");
            }
        })
};
module.exports.deleteSubType = deleteSubType;

const getSubTypesByGenTypeId = (req, res) => {
    const getAllGSEquip = subType.find({ genTypeId: req.params.id }).exec()
        .then((getAllGSEquip) => {
            if (getAllGSEquip) {
                res.send(getAllGSEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getSubTypesByGenTypeId = getSubTypesByGenTypeId;

const getOneSubTypeByGenTypeId = (req, res) => {
    const getAllGSEquip = subType.findOne(req.query).exec()
        .then((getAllGSEquip) => {
            if (getAllGSEquip) {
                res.send(getAllGSEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneSubTypeByGenTypeId = getOneSubTypeByGenTypeId;