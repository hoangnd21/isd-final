const mongoose = require('mongoose');
const schema = mongoose.Schema;

const liquidationSchema = new schema({
    userId: String,
    status: String,
    equipId: String,
    accessories: String,
    create_at: Date,

})

const liquidation = mongoose.model('liquidation', liquidationSchema);
module.exports = liquidation;