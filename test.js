const axios = require('axios')

axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5",
    headers: {
        "Authorization": 'Bearer ' + 'BQBa4OJJiSjsxctgwvTK2vlsqpbU45x77i8809qk6bt7X8R6kH6PMHxwVCLgHw8fa1RX68FqttPKaAZ8wLGXrRURVGP3UifJw2bvl5EN1zShuLg9aMUx9XUnLiaWxOJo5RqSC7WfsQIqIkcianRmMHo9IRoGcw',
    }
}).then((res) => {
    console.log(res.data.items)
    return res
}).catch((err) => {
    console.log(err)
    console.log("Something went wrong with your request.")
})