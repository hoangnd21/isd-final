const mongoose = require('mongoose');
const schema = mongoose.Schema;

const equipmentDistributionSchema = new schema({
    date: Date,
    device: String,
    user: String,
    note: String
})

const equipmentDistribution = mongoose.model('equipmentDistribution', equipmentDistributionSchema);
module.exports = equipmentDistribution;