const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://mohammedquadir:newton123@cluster0.jfn7x3e.mongodb.net/user_db?retryWrites=true&w=majority'

module.exports = () => {
    return mongoose.connect(dbUri)
}
