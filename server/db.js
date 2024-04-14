const mongoose = require('mongoose')

const dbUri = //mongoAtlas Link
mongoose.connect(dbUri);

module.exports = () => {
    return mongoose.connect(dbUri)
}