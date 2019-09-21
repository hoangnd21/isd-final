const mongoose = require('mongoose');
const schema = mongoose.Schema;

const manaEquipOnUseSchema = new schema({
    device: String,
    accessories: String,
    startDate: Date,
    note: String
})

const manaEquipOnUse = mongoose.model('manaEquipOnUse', manaEquipOnUseSchema);
module.exports = manaEquipOnUse;