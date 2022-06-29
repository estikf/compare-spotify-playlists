const fs = require("fs").promises;
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const FILES_PATH = "./songs";
const PLAYLISTS = "./playlists";

const getFiles = async () => fs.readdir(FILES_PATH);

const getPlaylistItems = async (playlist) =>
    fs.readFile(`${PLAYLISTS}/${playlist}`, "utf8", (err, data) => {
        return data;
    });

const listAllPlaylists = async () => fs.readdir(PLAYLISTS);

const comparePlaylists = async () => {
    const playlists = await listAllPlaylists();
    console.log("Playlists to be compared: ")
    console.log(playlists.map((item,index) => index+1 + ". " + item).join("\n"));
    rl.question("Enter playlist number.", async (choice) => {
        const tracks = await getPlaylistItems(playlists[choice-1]);
        const files = await getFiles();

        files.forEach((item) =>
            JSON.parse(tracks).map((i) => {
                if(item.split("-")[1].substring(1, 5) === i.trackName.substring(0, 4)){
                    console.log(i, "Exists")
                }
            })
        );
        process.exit()
    });
};

comparePlaylists();
