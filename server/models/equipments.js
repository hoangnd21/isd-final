const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const schema = mongoose.Schema;
const equipmentSchema = new schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    seriNo: String,
    name: String,
    generalType: Array,
    subtype: Array,
    lockStatus: Array,
    eqStatus: Array,
    datePurchase: Date,
    originalPrice: Number,
    warrantyMonths: Number,
    batch: Array,
    startDate: Date,
    manufacturer: String,
    note: String,
    created_at: Date,
    owner: Array
});



const equipments = mongoose.model('equipments', equipmentSchema);
module.exports = equipments;


equipmentSchema.pre('save', (next) => {
    var now = Date.now()
    // Set a value for createdAt only if it is null
    if (!this.created_at) {
        this.created_at = now
    }
    // Call the next function in the pre-save chain
    next()
})


// equipments.create({
//     "code": "a",
//     "seriNo": "a",
//     "name": "a",
//     "generalType": "a",
//     "subtype": "a",
//     "status": "a",
//     "datePurchase": "2019/02/05",
//     "originalPrice": "130",
//     "warrantyMonths": "130",
//     "batch": "a",
//     "startDate": "2019/02/05",
//     "manufacturer": "a",
//     "note": "a",
//     "created_at": ""
// });

