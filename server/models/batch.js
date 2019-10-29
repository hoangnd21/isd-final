const mongoose = require('mongoose');
const schema = mongoose.Schema;

const batchSchema = new schema({
    code: String,
    date: Date,
    provider: String,
    contactPerson: String,
    note: String,
    create_at: Date
});

const batch = mongoose.model('batches', batchSchema);
module.exports = batch;