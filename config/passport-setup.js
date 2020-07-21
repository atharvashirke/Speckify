const passport = require('passport')
require('dotenv').config()
const SpotifyStrategy = require("passport-spotify").Strategy
const User = require('../models/user.js')

passport.use(
    new SpotifyStrategy({   
    // Options for SpotifyStrategy
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/spotify/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log("callback function fired")
        console.log(profile)
        
    })
)