const mongoose = require('mongoose');

module.exports = mongoose.model('Attendee', {
    attendeeName: {type: String},
    eventName: {type: String},
    date: {type:Date},
});