const mongoose = require('mongoose');
const schema = mongoose.Schema;

const generalTypeSchema = new schema({
    value: String,
    label: String
});
const generalType = mongoose.model('generalTypes', generalTypeSchema);

module.exports = generalType;