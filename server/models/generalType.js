const mongoose = require('mongoose');
const schema = mongoose.Schema;

const generalTypeSchema = new schema({
    value: String,
    label: String,
    create_at: Date
});
const generalType = mongoose.model('generalTypes', generalTypeSchema);

module.exports = generalType;