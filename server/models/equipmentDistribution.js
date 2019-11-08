const mongoose = require('mongoose');
const schema = mongoose.Schema;

const equipmentDistributionSchema = new schema({
    handingDate: Date,
    reclaimDate: Date,
    device: String,
    user: [],
    status: String,
    note: String,
    created_at: Date
})

const equipmentDistribution = mongoose.model('equipmentDistribution', equipmentDistributionSchema);
module.exports = equipmentDistribution;