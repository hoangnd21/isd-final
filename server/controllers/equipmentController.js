const equipment = require('../models/equipments');

const addEquipment = (req, res) => {
    equipment.create({
        code: req.body.code,
        seriNo: req.body.seriNo,
        name: req.body.name,
        generalType: req.body.generalType,
        subtype: req.body.subtype,
        status: req.body.status,
        datePurchase: req.body.datePurchase,
        originalPrice: req.body.originalPrice,
        warrantyMonths: req.body.warrantyMonths,
        batch: req.body.batch,
        startDate: req.body.startDate,
        manufacturer: req.body.manufacturer,
        note: req.body.note
    })
    res.send("Equipment created successfully");
};
module.exports.addEquipment = addEquipment;

const getAllEquipment = (req, res) => {
    const equip = equipment.find({}).exec().then(
        (equip) => {
            if (equip) {
                res.send(equip);
            }
            else {
                res.send('fail');
            }
        }
    )
};
module.exports.getAllEquipment = getAllEquipment;

const updateOneEquipment = (req, res) => {
    const oneEquipment = equipment.findById(req.params.id).exec()
        .then((oneEquipment) => {
            if (oneEquipment) {
                const newValue = { $set: req.body }
                equipment.updateOne(oneEquipment, newValue, (err, res) => {
                    if (err) throw err;
                    console.log("1 document updated");

                })
                res.send("1 document updated successfully");
            }
        }

        )
}
module.exports.updateOneEquipment = updateOneEquipment;

const deleteOneEquipment = (req, res) => {
    const oneEquip = equipment.findById(req.params.id).exec()
        .then((oneEquip) => {
            if (oneEquip) {
                equipment.deleteOne(oneEquip, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        }
        )
}
module.exports.deleteOneEquipment = deleteOneEquipment;

const getOneEquipment = (req, res) => {
    const getEquip = equipment.findById(req.params.id).exec()
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
module.exports.getOneEquipment = getOneEquipment;
