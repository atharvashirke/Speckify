const router = require('express').Router()
const passport = require('passport')

// Auth login
router.get("/login", (req, res) => {
    res.render("login")
})

// Auth logout
router.get("/logout", (req, res) => {
    //Handle with passport
    res.send("Logging out")
})


// Auth with spotify
router.get("/spotify", passport.authenticate('spotify', {
    scope: ['user-read-email']
}))

// Auth redirect
router.get("/spotify/redirect", passport.authenticate('spotify'), (req, res) => {
    res.send("You've reached callback URI")
})

module.exports = router