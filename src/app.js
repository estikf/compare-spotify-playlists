const fetchPlaylists = require("./getPlaylists")
const getPlaylistTracks = require("./getPlaylistTracks")
const readline = require("readline");
const getAccessToken = require("./auth");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const main = async () => {
        let response = await getAccessToken()
        accessToken = response.data.access_token
        await fetchPlaylists(50,0, accessToken)
            .then(res => {
                playlists = res.map((item, index) => index + " -> " + item.name).join("\n")
                console.log(playlists)
                rl.question("Enter playlist number.", (playlist) => {
                    getPlaylistTracks(res[playlist], accessToken)  // send playlist object
                })
            })

}

main()