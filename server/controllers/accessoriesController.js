const accessories = require('../models/accessories');

const addAccessories = (req, res) => {
    const now = Date.now()
    accessories.create({
        accCode: req.body.accCode,
        accName: req.body.accName,
        genTypeAttached: req.body.genTypeAttached,
        subTypeAttached: req.body.subTypeAttached,
        batch: req.body.batch,
        purchaseDate: req.body.purchaseDate,
        price: req.body.price,
        warranty: req.body.warranty,
        warrantyStartDate: req.body.warrantyStartDate,
        warrantyEndDate: req.body.warrantyEndDate,
        provider: req.body.provider,
        lockStatus: req.body.lockStatus,
        accStatus: req.body.accStatus,
        note: req.body.note,
        created_at: now,
        owner: req.body.owner
    });
    res.send("Accessory is successfully created");
};
module.exports.addAccessories = addAccessories;

const getAllAccessories = (req, res) => {
    const getAllAccessories = accessories.find({}).sort({ created_at: -1 }).exec()
        .then((getAllAccessories) => {
            if (getAllAccessories) {
                res.send(getAllAccessories);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllAccessories = getAllAccessories;

const getOneAccessories = (req, res) => {
    const getOneAccessories = accessories.findById(req.params.id).exec()
        .then((getOneAccessories) => {
            if (getOneAccessories) {
                res.send(getOneAccessories);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneAccessories = getOneAccessories;

const updateAccessories = (req, res) => {
    const updateAccessories = accessories.findById(req.params.id).exec()
        .then((updateAccessories) => {
            if (updateAccessories) {
                const newValue = { $set: req.body };
                accessories.updateOne(updateAccessories, newValue, (err, res) => {
                    if (err) throw err;

                })
                res.send("Accessory is successfully updated");
            }
        })
};
module.exports.updateAccessories = updateAccessories;

const deleteAccessories = (req, res) => {
    const deleteAccessories = accessories.findById(req.params.id).exec()
        .then((deleteAccessories) => {
            if (deleteAccessories) {
                accessories.deleteOne(deleteAccessories, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("Accessory is successfully deleted");
            }
        })
};
module.exports.deleteAccessories = deleteAccessories; 