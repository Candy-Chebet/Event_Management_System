const mongoose = require('mongoose')

const dbUri = //connect to mongoDb

mongoose.connect(dbUri);

module.exports = () => {
    return mongoose.connect(dbUri)
}