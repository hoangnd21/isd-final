const mongoose = require('mongoose');
const schema = mongoose.Schema;

const statusSchema = new schema({
    status: String,

})

const status = mongoose.model('status', statusSchema);
module.exports = status;