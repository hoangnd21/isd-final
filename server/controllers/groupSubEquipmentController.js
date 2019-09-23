const groupSubEquipment = require('../models/groupSubEquipment');

const addGroupSubEquipment = (req, res) => {
    groupSubEquipment.create({
        code: req.body.code,
        type: req.body.type,
        groupName: req.body.groupName,
        depreciation: req.body.depreciation,
        description: req.body.description
    })
    res.send("1 document created successfully");
};
module.exports.addGroupSubEquipment = addGroupSubEquipment;

const getAllGroupSubEquipment = (req, res) => {
    const getAllGSEquip = groupSubEquipment.find({}).exec()
        .then((getAllGSEquip) => {
            if (getAllGSEquip) {
                res.send(getAllGSEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllGroupSubEquipment = getAllGroupSubEquipment;

const getOneGroupSubEquipment = (req, res) => {
    const getOneGSEquip = groupSubEquipment.findById(req.params.id).exec()
        .then((getOneGSEquip) => {
            if (getOneGSEquip) {
                res.send(getOneGSEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneGroupSubEquipment = getOneGroupSubEquipment;

const updateGroupSubEquipment = (req, res) => {
    const updateGSEquipment = groupSubEquipment.findById(req.params.id).exec()
        .then((updateGSEquipment) => {
            if (updateGSEquipment) {
                const newValue = { $set: req.body };
                groupSubEquipment.updateOne(updateGSEquipment, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateGroupSubEquipment = updateGroupSubEquipment;

const deleteGroupSubEquipment = (req, res) => {
    const deleteGSEquipment = groupSubEquipment.findById(req.params.id).exec()
        .then((deleteGSEquipment) => {
            if (deleteGSEquipment) {
                groupSubEquipment.deleteOne(deleteGSEquipment, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteGroupSubEquipment = deleteGroupSubEquipment; 