const router = require('express').Router()
const axios = require('axios')
const User = require("../models/user.js")
const qs = require('qs')
require('dotenv').config()

function authCheck(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.redirect("/auth/login")
    }
}

router.get("/", authCheck, (req, res) => {
    res.redirect("/dashboard/recently-played")
})

router.get("/recently-played", authCheck, (req, res) => {
    var limit = 20
    if (req.query.limit) {
        limit = req.query.limit
    }
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/player/recently-played?type=track&limit=" + limit + "&before=" + new Date().getTime(),
        headers: {
            "Authorization": 'Bearer ' + req.user.accessToken,
        }
    }).then((response) => { 
        res.render("recently-played", {user : req.user, items: response.data.items, limit: limit, javascript:"/js/dashboard.js"})
    }).catch((err) => {
        res.redirect("/auth/login")
    })
})

router.get("/top-tracks", authCheck, (req, res) => {
    var limit = 20
    if (req.query.limit) {
        limit = req.query.limit
    }
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=" + limit,
        headers: {
            "Authorization": 'Bearer ' + req.user.accessToken,
        }
    }).then((response) => { 
        res.render("top-tracks", {user : req.user, items: response.data.items, limit: limit, javascript:"/js/dashboard.js"})
    }).catch((err) => {
        res.redirect("/auth/login")
    })
})

router.get("/top-artists", authCheck, (req, res) => {
    var limit = 20
    if (req.query.limit) {
        limit = req.query.limit
    }
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=" + limit,
        headers: {
            "Authorization": 'Bearer ' + req.user.accessToken,
        }
    }).then((response) => { 
        res.render("top-artists", {user : req.user, items: response.data.items, limit: limit, javascript:"/js/dashboard.js"})
    }).catch((err) => {
        refreshToken(req).then(axios({
            method: "get",
            url: "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=" + limit,
            headers: {
                "Authorization": 'Bearer ' + req.user.accessToken,
            }
        }).then((response) => { 
            res.render("top-artists", {user : req.user, items: response.data.items, limit: limit, javascript:"/js/dashboard.js"})
        })).catch((err) => {
            res.redirect("/auth/login")
        }) 
    })
})


router.get("/playlists", authCheck, (req, res) => {
    var limit = 50
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/users/" + req.user.spotifyID + "/playlists?limit=" + limit,
        headers: {
            "Authorization": 'Bearer ' + req.user.accessToken,
        }
    }).then((response) => { 
        res.render("playlists", {user : req.user, items: response.data.items, limit: limit, javascript:"/js/dashboard.js"})
    }).catch((err) => {
        res.redirect("/auth/login")
    })
})

module.exports = router