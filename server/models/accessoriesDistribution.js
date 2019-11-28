const mongoose = require('mongoose');
const schema = mongoose.Schema;

const accessoriesDistributionSchema = new schema({
    handingDate: Date,
    reclaimDate: Date,
    accessory: String,
    user: Array,
    status: String,
    note: String,
    created_at: Date,
    reason: Array
})

const accessoriesDistribution = mongoose.model('accessoriesDistribution', accessoriesDistributionSchema);
module.exports = accessoriesDistribution;