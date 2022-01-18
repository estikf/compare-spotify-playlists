const axios = require("axios").default
const fs = require("fs")
const credentials = require("./credentials.json")

const writeTracksToFile = (tracks, fileName) => {

    const path = `./playlists/${fileName}.json`

    let trackNames = tracks.map((item) => ({
        artist : item.track.artists[0].name,
        trackName : item.track.name,
        addedAt:item.added_at
    }))
    
    fs.readFile(path,"utf8" ,function (err, data){
        
        let tracks = data ? JSON.parse(data) : []
    
        let updatedTracks = [...tracks, ...trackNames]
        
        fs.writeFile(path, JSON.stringify(updatedTracks), function (err) {
            if (err) return console.log(err)}
        )
    })
}

const fetchPlaylistTracks = async (limit, offset, playlistId) => {
        try {
            let tracks = []
            let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}&locale=tr-TR,tr;q=0.9`
            
            while(url !== null){

                const newOffset = new URL(url).searchParams.get("offset")
                const newLimit = new URL(url).searchParams.get("limit")

                console.log(`Getting tracks on page ${newOffset/newLimit + 1}...`)

                let response = await axios.get(url,{
                    headers:{
                        "Authorization":`Bearer ${credentials.API_TOKEN}`
                    }})

                tracks = [...tracks, ...response.data.items]
                url = await response.data.next

                console.log(`Page ${newOffset/newLimit + 1} fetched.`)

            }

            console.log(`${tracks.length} songs fetched successfully.`)
            return tracks

        } catch (error) {
            if(error.response){
                console.log("An error occured!",error.response.data)
            }else{
                console.log("An error occured!",error)
            }
    }
}

module.exports = getPlaylistTracks = (playlist) => {
    fetchPlaylistTracks(100, 0, playlist.playlistId)
        .then(res => writeTracksToFile(res, playlist.name.split(" ").join("_")))
        .catch(err => console.log(err))
}

