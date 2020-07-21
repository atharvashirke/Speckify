const router = require('express').Router()

function authCheck(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.redirect("/auth/login")
    }
}

router.get("/", authCheck, (req, res) => {
    res.render("dashboard", {user : req.user})
})

module.exports = router