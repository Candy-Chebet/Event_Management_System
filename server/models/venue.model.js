const mongoose = require('mongoose');

module.exports = mongoose.model('Venue', {
    venueName: {type: String},
    Amenities: {type: String}
});