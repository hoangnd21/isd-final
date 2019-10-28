const mongoose = require('mongoose');
const schema = mongoose.Schema;

const errorReportSchema = new schema({
    user: String,
    device: String,
    option: String,
    reportDate: Date,
    note: String,
    create_at: Date
})

const errorReport = mongoose.model('errorReport', errorReportSchema);
module.exports = errorReport;