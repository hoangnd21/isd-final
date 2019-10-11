const equipment = require('../models/equipments');
const mongoXlsx = require('mongo-xlsx');

const xlsxAllEquipment = (req, res) => {
    equipment.find({}).sort({ created_at: -1 }).exec()
        .then(
            (data) => {
                if (data) {
                    // console.log(data)
                    /* Generate automatic model for processing (A static model should be used) */
                    var model = mongoXlsx.buildDynamicModel(data);

                    /* Generate Excel */
                    mongoXlsx.mongoData2Xlsx(data, model, function (err, data) {
                        console.log('File saved at:', data.fullPath);
                        res.send("1 excel file exported");
                    });

                }
                else {
                    res.send('fail');
                }
            }
        )
};
module.exports.xlsxAllEquipment = xlsxAllEquipment;

const xlsxOneEquipment = (req, res) => {
    equipment.findById(req.params.id).exec()
        .then(
            (data) => {
                if (data) {
                    // console.log(data)
                    /* Generate automatic model for processing (A static model should be used) */
                    var model = mongoXlsx.buildDynamicModel([data]);

                    /* Generate Excel */
                    mongoXlsx.mongoData2Xlsx([data], model, function (err, data) {
                        console.log('File saved at:', data.fullPath);
                        res.send("1 excel file exported");
                    });
                }
                else {
                    res.send('fail');
                }
            }
        )
};
module.exports.xlsxOneEquipment = xlsxOneEquipment;