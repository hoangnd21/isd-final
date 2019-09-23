const mongoose = require('mongoose');
const schema = mongoose.Schema;

const groupEquipmentSchema = new schema({
    code: String,
    groupName: String,
    description: String
});
const groupEquipment = mongoose.model('groupEquipments', groupEquipmentSchema);

module.exports = groupEquipment;