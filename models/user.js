const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    spotifyID: String,
    image: String,
    accessToken: String,
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema)