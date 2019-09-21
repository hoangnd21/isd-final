const mongoose = require('mongoose');
const schema = mongoose.Schema;

const groupSubEquipmentSchema = new schema({
    code: String,
    type: String,
    groupName: String,
    depreciation: Number,
    description: String
});
const groupSubEquipment = mongoose.model('groupSubEquipments', groupSubEquipmentSchema);

module.exports = groupSubEquipment;