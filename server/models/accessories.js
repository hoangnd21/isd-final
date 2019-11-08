const mongoose = require('mongoose');
const schema = mongoose.Schema;

const accessoriesSchema = new schema({
    accCode: String,
    accName: String,
    genTypeAttached: Array,
    subTypeAttached: Array,
    batch: Array,
    purchaseDate: Date,
    price: Number,
    warranty: Number,
    warrantyStartDate: Date,
    warrantyEndDate: Date,
    provider: Array,
    lockStatus: Array,
    accStatus: Array,
    note: String,
    created_at: Date
})

const accessories = mongoose.model('accessories', accessoriesSchema);
module.exports = accessories;