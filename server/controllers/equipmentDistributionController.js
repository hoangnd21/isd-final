const equipmentDistribution = require('../models/equipmentDistribution');

const addEquipmentDistribution = (req, res) => {
    equipmentDistribution.create({
        handingDate: req.body.handingDate,
        reclaimDate: req.body.reclaimDate,
        device: req.body.device,
        user: req.body.user,
        status: req.body.status,
        note: req.body.note
    });
    res.send("Handing entry successfully added");
};
module.exports.addEquipmentDistribution = addEquipmentDistribution;

const getAllEquipmentDistribution = (req, res) => {
    const getAllEquipmentDistribution = equipmentDistribution.find({}).exec()
        .then((getAllEquipmentDistribution) => {
            if (getAllEquipmentDistribution) {
                res.send(getAllEquipmentDistribution);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllEquipmentDistribution = getAllEquipmentDistribution;

const getOneEquipmentDistribution = (req, res) => {
    const getOneEquipmentDistribution = equipmentDistribution.findById(req.params.id).exec()
        .then((getOneEquipmentDistribution) => {
            if (getOneEquipmentDistribution) {
                res.send(getOneEquipmentDistribution);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneEquipmentDistribution = getOneEquipmentDistribution;

const updateEquipmentDistribution = (req, res) => {
    const updateEquipmentDistribution = equipmentDistribution.findById(req.params.id).exec()
        .then((updateEquipmentDistribution) => {
            if (updateEquipmentDistribution) {
                const newValue = { $set: req.body };
                equipmentDistribution.updateOne(updateEquipmentDistribution, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateEquipmentDistribution = updateEquipmentDistribution;

const deleteEquipmentDistribution = (req, res) => {
    const deleteEquipmentDistribution = equipmentDistribution.findById(req.params.id).exec()
        .then((deleteEquipmentDistribution) => {
            if (deleteEquipmentDistribution) {
                equipmentDistribution.deleteOne(deleteEquipmentDistribution, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteEquipmentDistribution = deleteEquipmentDistribution;

const getOneEquipmentDistributionByEquipId = (req, res) => {
    const getOneEquipmentDistributionByEquipId = equipmentDistribution.findOne({ device: req.body.device, status: "handing" }).exec()
        .then((getOneEquipmentDistributionByEquipId) => {
            if (getOneEquipmentDistributionByEquipId) {
                res.send(getOneEquipmentDistributionByEquipId);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneEquipmentDistributionByEquipId = getOneEquipmentDistributionByEquipId;
