const router = require('express').Router()
const axios = require('axios')
const sanitize = require("../helpers/sanitize.js")
const refresh = require("passport-oauth2-refresh")
const mongoose = require("mongoose")
const User = require("../models/user.js")
require('dotenv').config()

function authCheck(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.redirect("/auth/login")
    }
}

async function refreshToken(req) {
    try {
        const user = await User.findOne({spotifyID: req.user.spotifyID})
        console.log(user)
        refresh.requestNewAccessToken('spotify', req.user.refreshToken, async (err, accessToken, refreshToken) => {
            console.log(accessToken)
            user.accessToken = accessToken
            user.refreshToken = refreshToken
        })
        await user.save()
        console.log(user)
    } catch (err) {
        console.log(err)
    }
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
        refreshToken(req).then(res.redirect("/dashboard/"))
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
        refreshToken(req).then(res.redirect("/top-tracks"))
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
        refreshToken(req).then(res.redirect("/dashboard/top-artists"))
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
        refreshToken(req).then(res.redirect("/dashboard/playlists"))
    })
})

module.exports = router