const mongoose = require('mongoose');
const schema = mongoose.Schema;
const notificationSchema = new schema({
    type: String,
    sender: String,
    equipment: {
        eqId: String,
        eqName: String
    },
    msg: String,
    unread: Boolean,
    created_at: Date
});



const notifications = mongoose.model('notifications', notificationSchema);
module.exports = notifications;