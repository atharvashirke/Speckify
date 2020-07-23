const router = require('express').Router()
const axios = require('axios')
const sanitize = require("../helpers/sanitize.js")
require('dotenv').config()

function authCheck(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.redirect("/auth/login")
    }
}

router.get("/", authCheck, (req, res) => {
    var items;
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=12&offset=5",
        headers: {
            "Authorization": 'Bearer ' + req.user.accessToken,
        }
    }).then((response) => { 
        res.render("dashboard", {user : req.user, items: response.data.items, javascript:"/js/dashboard.js"})
    }).catch((err) => {
        console.log(err)
        console.log("Something went wrong with your request.")
    })
})

module.exports = router