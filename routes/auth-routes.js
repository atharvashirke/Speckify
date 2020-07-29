const router = require('express').Router()
const passport = require('passport')

// Auth login
router.get("/login", (req, res) => {
    res.redirect("/auth/spotify")
})

// Auth logout
router.get("/logout", (req, res) => {
    //Handle with passport
    req.logout()
    res.redirect("/")
})


// Auth with spotify
router.get("/spotify", passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-recently-played', 'user-top-read', 'playlist-read-private', 'playlist-read-collaborative', , "user-read-playback-state", "user-modify-playback-state"]
}))

// Auth redirect
router.get("/spotify/redirect", passport.authenticate('spotify'), (req, res) => {
    res.redirect("https://speckify.herokuapp.com/dashboard/")
})

module.exports = router