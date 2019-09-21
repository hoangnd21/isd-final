const mongoose = require('mongoose');
const schema = mongoose.Schema;

const involvedDocumentsSchema = new schema({
    type: String,
    name: String,
    attachedFile: String,
    belongedDevice: String,
    note: String
})

const involvedDocuments = mongoose.model('involvedDocuments', involvedDocumentsSchema);
module.exports = involvedDocuments;