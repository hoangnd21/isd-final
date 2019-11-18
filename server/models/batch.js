const mongoose = require('mongoose');
const schema = mongoose.Schema;

const batchSchema = new schema({
    code: String,
    date: Date,
    provider: Array,
    contactPerson: String,
    note: String,
    created_at: Date
});

const batch = mongoose.model('batches', batchSchema);
module.exports = batch;