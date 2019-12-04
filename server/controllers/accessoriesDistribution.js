const AccessoriesDistribution = require('../models/accessoriesDistribution');

const addAccessoriesDistribution = (req, res) => {
    const now = Date.now()
    AccessoriesDistribution.create({
        handingDate: req.body.handingDate,
        reclaimDate: req.body.reclaimDate,
        accessory: req.body.device,
        user: req.body.user,
        status: req.body.status,
        note: req.body.note,
        created_at: now,
        reason: req.body.reason
    });
    res.send("Handing entry successfully added");
};
module.exports.addAccessoriesDistribution = addAccessoriesDistribution;

const getAllAccessoriesDistribution = (req, res) => {
    const getAllAccessoriesDistribution = AccessoriesDistribution.find({}).sort({ created_at: -1 }).exec()
        .then((getAllAccessoriesDistribution) => {
            if (getAllAccessoriesDistribution) {
                res.send(getAllAccessoriesDistribution);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllAccessoriesDistribution = getAllAccessoriesDistribution;

const getOneAccessoriesDistribution = (req, res) => {
    const getOneAccessoriesDistribution = AccessoriesDistribution.findById(req.params.id).exec()
        .then((getOneAccessoriesDistribution) => {
            if (getOneAccessoriesDistribution) {
                res.send(getOneAccessoriesDistribution);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneAccessoriesDistribution = getOneAccessoriesDistribution;

const updateAccessoriesDistribution = (req, res) => {
    const updateAccessoriesDistribution = AccessoriesDistribution.findById(req.params.id).exec()
        .then((updateAccessoriesDistribution) => {
            if (updateAccessoriesDistribution) {
                const newValue = { $set: req.body };
                AccessoriesDistribution.updateOne(updateAccessoriesDistribution, newValue, (err, res) => {
                    if (err) throw err;
                })
                res.send("Reclamation entry successfully added");
            }
        })
};
module.exports.updateAccessoriesDistribution = updateAccessoriesDistribution;

const deleteAccessoriesDistribution = (req, res) => {
    const deleteAccessoriesDistribution = AccessoriesDistribution.findById(req.params.id).exec()
        .then((deleteAccessoriesDistribution) => {
            if (deleteAccessoriesDistribution) {
                AccessoriesDistribution.deleteOne(deleteAccessoriesDistribution, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("Handing entry successfully deleted");
            }
        })
};
module.exports.deleteAccessoriesDistribution = deleteAccessoriesDistribution;

const getOneAccessoriesDistributionByEquipId = (req, res) => {
    const getOneAccessoriesDistributionByEquipId = AccessoriesDistribution.findOne({ device: req.body.device, status: "In Use" }).exec()
        .then((getOneAccessoriesDistributionByEquipId) => {
            if (getOneAccessoriesDistributionByEquipId) {
                res.send(getOneAccessoriesDistributionByEquipId);
            }
            else {

                res.send('fail vcl');
            }
        })
};
module.exports.getOneAccessoriesDistributionByEquipId = getOneAccessoriesDistributionByEquipId;
