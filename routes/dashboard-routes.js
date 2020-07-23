const router = require('express').Router()
const axios = require('axios')
const sanitize = require("../helpers/sanitize.js")
const refresh = require("passport-oauth2-refresh")
require('dotenv').config()

function authCheck(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.redirect("/auth/login")
    }
}

function refreshToken(req) {
    refresh.requestNewAccessToken('spotify', req.user.refreshToken, (err, accessToken, refreshToken) => {
        req.user.accessToken = accessToken
        req.user.refreshToken = refreshToken
    })
}

router.get("/", authCheck, (req, res) => {
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/player/recently-played?type=track&limit=12&after=1484811043508",
        headers: {
            "Authorization": 'Bearer ' + req.user.accessToken,
        }
    }).then((response) => { 
        res.render("recently-played", {user : req.user, items: response.data.items, javascript:"/js/dashboard.js"})
    }).catch((err) => {
        refreshToken(req)
        res.redirect("/dashboard/")
    })
})

router.get("/top-tracks", authCheck, (req, res) => {
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=12&offset=5",
        headers: {
            "Authorization": 'Bearer ' + req.user.accessToken,
        }
    }).then((response) => { 
        res.render("top-tracks", {user : req.user, items: response.data.items, javascript:"/js/dashboard.js"})
    }).catch((err) => {
        refreshToken(req)
        res.redirect("/dashboard/top-tracks")
    })
})

router.get("/top-artists", authCheck, (req, res) => {
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=12&offset=5",
        headers: {
            "Authorization": 'Bearer ' + req.user.accessToken,
        }
    }).then((response) => { 
        res.render("top-artists", {user : req.user, items: response.data.items, javascript:"/js/dashboard.js"})
    }).catch((err) => {
        refreshToken(req)
        res.redirect("/dashboard/top-artists")
    })
})


router.get("/playlists", authCheck, (req, res) => {
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/users/" + req.user.spotifyID + "/playlists?limit=12&offset=5",
        headers: {
            "Authorization": 'Bearer ' + req.user.accessToken,
        }
    }).then((response) => { 
        res.render("playlists", {user : req.user, items: response.data.items, javascript:"/js/dashboard.js"})
    }).catch((err) => {
        refreshToken(req)
        res.redirect("/dashboard/playlists")
    })
})

module.exports = router