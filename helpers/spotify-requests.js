const axios = require("axios")

async function getTopTracks(accessToken) {
    try {
        return await axios.get('https://api.spotify.com/v1/me/playlists?limit=10&offset=5', {
            headers: {
                'Authorization': 'token' + accessToken
            }
        })
    } catch(error) {
        console.log(err)
    }
}

module.exports = getTopTracks