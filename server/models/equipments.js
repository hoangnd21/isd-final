const mongoose = require('mongoose');
const schema = mongoose.Schema;
const equipmentSchema = new schema({
    code: String,
    seriNo: String,
    name: String,
    generalType: String,
    subtype: String,
    status: String,
    datePurchase: Date,
    originalPrice: Number,
    warrantyMonths: Number,
    batch: String,
    startDate: Date,
    manufacturer: String,
    note: String
});

const equipments = mongoose.model('equipments', equipmentSchema);
module.exports = equipments;

// equipments.create({
//     "code": "a",
//     "seriNo": "1",
//     "name": "a",
//     "subtype": "a",
//     "status": "a",
//     "datePurchase": "2019 / 08 / 20",
//     "originalPrice": "888",
//     "warranty": "3",
//     "department": "a",
//     "location": "a",
//     "batch": "a",
//     "startDate": "2019 / 08 / 20",
//     "note": "a"
// });

