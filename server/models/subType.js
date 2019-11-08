const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subTypeSchema = new schema({
    value: String,
    label: String,
    genTypeId: String,
    created_at: Date
});
const subType = mongoose.model('subTypes', subTypeSchema);

module.exports = subType;