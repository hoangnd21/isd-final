const mongoose = require('mongoose');
const schema = mongoose.Schema;

const accessoriesSchema = new schema({
    accCode: String,
    accName: String,
    subTypeAttached: String,
    batch: String,
    purchaseDate: Date,
    price: Number,
    warranty: Number,
    warrantyStartDate: Date,
    warrantyEndDate: Date,
    provider: String,
    lockStatus: Array,
    accStatus: Array,
    note: String,
    create_at: Date
})

const accessories = mongoose.model('accessories', accessoriesSchema);
module.exports = accessories;