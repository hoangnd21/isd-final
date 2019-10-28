const mongoose = require('mongoose');
const schema = mongoose.Schema;

const statusSchema = new schema({
    status: String,
    create_at: Date

})

const status = mongoose.model('status', statusSchema);
module.exports = status;