const mongoose = require('mongoose')

const dbUri = //mongodb link;

mongoose.connect(dbUri);

module.exports = () => {
    return mongoose.connect(dbUri)
}