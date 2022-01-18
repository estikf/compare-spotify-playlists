const axios = require("axios").default
const credentials = require("./credentials.json")

module.exports = fetchPlaylists = async (limit, offset) => {
    
    console.log("Loading playlists...")

    try {
        let playlists = []
        let url = `https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=${limit}`
        
        while(url !== null){

            let response = await axios.get(url,{
                headers:{
                    "Authorization":`Bearer ${credentials.API_TOKEN}`
                }})

            playlists = [...playlists, ...response.data.items]
            url = await response.data.next
        }

        return playlists.map(i => ({
            "totalSongs":i.tracks.total,
            "name":i.name,
            "playlistId":i.id
        }))

    } catch (error) {
        if(error.response){
            console.log("An error occured!",error.response.data)
        }else{
            console.log("An error occured!",error)
        }
    }
}