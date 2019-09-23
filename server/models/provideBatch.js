const mongoose = require('mongoose');
const schema = mongoose.Schema;

const provideBatchSchema = new schema({
    code: String,
    date: Date,
    provider: String,
    contactPerson: String,
    note: String
});

const providerBatch = mongoose.model('provideBatches', provideBatchSchema);
module.exports = providerBatch;