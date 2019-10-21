const mongoose = require('mongoose');
const schema = mongoose.Schema;
const notificationSchema = new schema({
    reqUser: String,
    resUser: String,
    read: Boolean,
    created_at: Date
});



const notifications = mongoose.model('notifications', notificationSchema);
module.exports = notifications;