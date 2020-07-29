const axios = require('axios')
const mongoose = require("mongoose")
const User = require("./models/user.js")

async function refreshToken(req) {
    console.log("attempting token refresh")
    currentUser = await User.findOne({spotifyID : req.user.spotifyID})
    console.log(currentUser)
    axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization": "Basic " + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
        },
        data: {
            "grant_type": "refresh_token",
            "refresh_token": currentUser.refreshToken
        }
    }).then((response) => {
        currentUser.refreshToken = response.refresh_token
        user.save(function(err) {
            if (err) return next(err)
            // What's happening in passport's session? Check a specific field...
            console.log("Before relogin: "+req.session.passport.user.refreshToken)
        
            req.login(user, function(err) {
                if (err) return next(err)
        
                console.log("After relogin: "+ req.session.passport.user.refreshToken)
                res.send(200)
            })
        })
    })
}
