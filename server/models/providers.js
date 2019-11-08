const mongoose = require('mongoose');
const schema = mongoose.Schema;

const providerSchema = new schema({
    name: String,
    address: String,
    hotline: String,
    contactPerson: {
        CPName: String,
        emailCP: String,
        phoneCP: String
    },
    warrantyPerson: {
        WPName: String,
        emailWP: String,
        phoneWP: String
    },
    note: String,
    created_at: Date
});

const providers = mongoose.model('providers', providerSchema);
module.exports = providers;