const router = require('express').Router()
const passport = require('passport')

// Auth login
router.get("/login", (req, res) => {
    res.render("login", {user: req.user})
})

// Auth logout
router.get("/logout", (req, res) => {
    //Handle with passport
    req.logout()
    res.redirect("/")
})


// Auth with spotify
router.get("/spotify", passport.authenticate('spotify', {
    scope: ['user-read-email']
}))

// Auth redirect
router.get("/spotify/redirect", passport.authenticate('spotify'), (req, res) => {
    res.redirect("/dashboard")
})

module.exports = router