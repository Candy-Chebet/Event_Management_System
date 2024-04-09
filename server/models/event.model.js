const mongoose = require('mongoose');

module.exports = mongoose.model('Event', {
    
    eventName: {type: String},
    location:{type: String},
    ticket: {type: Number},
    date: {type:Date},
    time: {type:Number }
});