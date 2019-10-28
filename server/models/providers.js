const mongoose = require('mongoose');
const schema = mongoose.Schema;

const providerSchema = new schema({
    name: String,
    address: String,
    hotline: String,
    contactPerson: String,
    emailCP: String,
    phoneCP: String,
    warrantyPerson: String,
    emailWP: String,
    phoneWP: String,
    note: String,
    create_at: Date
});

const providers = mongoose.model('providers', providerSchema);
module.exports = providers;