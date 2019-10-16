const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subTypeSchema = new schema({
    value: String,
    label: String,
    genTypeId: String
});
const subType = mongoose.model('subTypes', subTypeSchema);

module.exports = subType;