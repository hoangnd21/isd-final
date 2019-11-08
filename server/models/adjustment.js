const mongoose = require('mongoose');
const schema = mongoose.Schema;

const adjustmentSchema = new schema({
    startDate: Date,
    device: String,
    type: String,
    completionEstimation: Date,
    note: String,
    created_at: Date
})

const adjustment = mongoose.model('adjustment', adjustmentSchema);
module.exports = adjustment;