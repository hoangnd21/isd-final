const mongoose = require('mongoose');
const schema = mongoose.Schema;

const warrantySchema = new schema({
    startDate: Date,
    device: String,
    type: String,
    completionEstimation: Date,
    note: String
})

const warranty = mongoose.model('warranty', warrantySchema);
module.exports = warranty;