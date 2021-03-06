const passport = require('passport')
const refresh = require("passport-oauth2-refresh")
require('dotenv').config()
const SpotifyStrategy = require("passport-spotify").Strategy
const User = require('../models/user.js')
const user = require('../models/user.js')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

async function updateToken(currentUser, accessToken, refreshToken) {
    currentUser.accessToken = accessToken
    currentUser.refreshToken = refreshToken
    await currentUser.save()
}

var strategy = new SpotifyStrategy({   
    // Options for SpotifyStrategy
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/spotify/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // Checks if user already exists
        console.log("Starting Authentication")
        try {
            User.findOne({ spotifyID: profile._json.id}).then((currentUser) => {
                if (currentUser) {
                    console.log("User already exists")
                    currentUser.accessToken = accessToken
                    currentUser.refreshToken = refreshToken
                    updateToken(currentUser, accessToken, refreshToken).then(done(null, currentUser))
                } else {
                    // Create new user
                    User.create({
                        name: profile._json.display_name,
                        email: profile._json.email,
                        spotifyID: profile._json.id,
                        image: profile._json.images[0].url,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }).then((newUser) => {
                        console.log('User Created: ' + newUser)
                        done(null, newUser)
                    })
                }
            })
        } catch(err) {
            console.log(err)
        }
    })

passport.use(strategy)
refresh.use(strategy)