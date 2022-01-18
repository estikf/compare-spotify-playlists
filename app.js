const fetchPlaylists = require("./getPlaylists")
const getPlaylistTracks = require("./getPlaylistTracks")
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const main = async () => {
        await fetchPlaylists(50,0)
            .then(res => {
                playlists = res.map((item, index) => index + " -> " + item.name).join("\n")
                console.log(playlists)
                rl.question("Enter playlist number.", (playlist) => {
                    getPlaylistTracks(res[playlist])  // send playlist object
                })
            })

}

main()