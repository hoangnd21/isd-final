const groupEquipment = require('../models/groupEquipment');

const addGroupEquipment = (req, res) => {
    groupEquipment.create({
        code: req.body.code,
        groupName: req.body.groupName,
        description: req.body.description
    })
    res.send("1 document created successfully");
};
module.exports.addGroupEquipment = addGroupEquipment;

const getAllGroupEquipment = (req, res) => {
    const getAllGEquip = groupEquipment.find({}).exec()
        .then((getAllGEquip) => {
            if (getAllGEquip) {
                res.send(getAllGEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllGroupEquipment = getAllGroupEquipment;

const getOneGroupEquipment = (req, res) => {
    const getOneGEquip = groupEquipment.findById(req.params.id).exec()
        .then((getOneGEquip) => {
            if (getOneGEquip) {
                res.send(getOneGEquip);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneGroupEquipment = getOneGroupEquipment;

const updateGroupEquipment = (req, res) => {
    const updateGEquipment = groupEquipment.findById(req.params.id).exec()
        .then((updateGEquipment) => {
            if (updateGEquipment) {
                const newValue = { $set: req.body };
                groupEquipment.updateOne(updateGEquipment, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateGroupEquipment = updateGroupEquipment;

const deleteGroupEquipment = (req, res) => {
    const deleteGEquipment = groupEquipment.findById(req.params.id).exec()
        .then((deleteGEquipment) => {
            if (deleteGEquipment) {
                groupEquipment.deleteOne(deleteGEquipment, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteGroupEquipment = deleteGroupEquipment; 