const accessories = require('../models/accessories');

const addAccessories = (req, res) => {
    accessories.create({
        code: req.body.code,
        seriNo: req.body.seriNo,
        name: req.body.name,
        originalDevice: req.body.originalDevice,
        tranferedDevice: req.body.tranferedDevice,
        purchaseDate: req.body.purchaseDate,
        price: req.body.price,
        warranty: req.body.warranty,
        warrantyStartDate: req.body.warrantyStartDate,
        belongedDevice: req.body.belongedDevice,
        note: req.body.note
    });
    res.send("1 document created successfully");
};
module.exports.addAccessories = addAccessories;

const getAllAccessories = (req, res) => {
    const getAllAccessories = accessories.find({}).exec()
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
                res.send("1 document updated");
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
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteAccessories = deleteAccessories; 