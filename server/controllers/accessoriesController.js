const accessories = require('../models/accessories');

const addAccessories = (req, res) => {
    const now = Date.now()
    accessories.create({
        code: req.body.code,
        name: req.body.name,
        originalDevice: req.body.originalDevice,
        tranferedDevice: req.body.tranferedDevice,
        purchaseDate: req.body.purchaseDate,
        price: req.body.price,
        warranty: req.body.warranty,
        warrantyStartDate: req.body.warrantyStartDate,
        belongedDevice: req.body.belongedDevice,
        note: req.body.note,
        create_at: now
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
                    else
                        console.log("1 document updated");

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