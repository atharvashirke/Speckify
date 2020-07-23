const axios = require('axios')

axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/player/recently-played?type=track&limit=10&after=1484811043508",
    headers: {
        "Authorization": 'Bearer ' + 'BQCUsOc2qy5mjmeFYutZqIqfiD6BYTioBUaxWigdOhYRxwdzjxE8c4GRZkTvwVdOStN70stc-om-Tz8ObjXoXIww4Ud0H3LOhA9btiwa_-48-7jDok8gWAFu1WFOMBmnNkW93mx1ibhSBROdDuuMuHmzr8hdDw',
    }
}).then((res) => {
    console.log(res.data.items[0].track.album.artists.length)
    return res
}).catch((err) => {
    console.log(err)
    console.log("Something went wrong with your request.")
})