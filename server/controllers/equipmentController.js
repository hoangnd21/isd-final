const equipment = require('../models/equipments');
// const mongoXlsx = require('mongo-xlsx');

const addEquipment = (req, res) => {
    const now = Date.now();
    equipment.create({
        code: req.body.code,
        seriNo: req.body.seriNo,
        name: req.body.name,
        generalType: req.body.generalType,
        subtype: req.body.subtype,
        lockStatus: req.body.lockStatus,
        eqStatus: req.body.eqStatus,
        datePurchase: req.body.datePurchase,
        originalPrice: req.body.originalPrice,
        warrantyMonths: req.body.warrantyMonths,
        batch: req.body.batch,
        startDate: req.body.startDate,
        manufacturer: req.body.manufacturer,
        note: req.body.note,
        created_at: now
    })
    res.send("Equipment created successfully");
};
module.exports.addEquipment = addEquipment;

const getAllEquipment = (req, res) => {
    const equip = equipment.find({}).sort({ created_at: -1 }).exec().then(
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


// const xlsxEquipment = (req, res) => {
//     equipment.find({}).sort({ created_at: -1 }).exec()
//         .then(
//             (data) => {
//                 if (data) {
//                     var model = mongoXlsx.buildDynamicModel(data);
//                     mongoXlsx.mongoData2Xlsx(data, model, function (err, data) {
//                         console.log('File saved at:', data.fullPath);
//                     });
//                     res.send(data);
//                 }
//                 else {
//                     res.send('fail');
//                 }
//             }
//         )
// };
// module.exports.xlsxEquipment = xlsxEquipment;


