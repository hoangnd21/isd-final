const mongoose = require('mongoose');
const schema = mongoose.Schema;

const equipmentDistributionSchema = new schema({
    handingDate: Date,
    reclaimDate: Date,
    device: String,
    user: String,
    note: String
})

const equipmentDistribution = mongoose.model('equipmentDistribution', equipmentDistributionSchema);
module.exports = equipmentDistribution;