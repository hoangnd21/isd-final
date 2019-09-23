const mongoose = require('mongoose');
const schema = mongoose.Schema;

const accessoriesSchema = new schema({
    code: String,
    seriNo: String,
    name: String,
    originalDevice: String,
    tranferedDevice: String,
    purchaseDate: Date,
    price: Number,
    warranty: Number,
    warrantyStartDate: Date,
    belongedDevice: String,
    note: String
})

const accessories = mongoose.model('accessories', accessoriesSchema);
module.exports = accessories;