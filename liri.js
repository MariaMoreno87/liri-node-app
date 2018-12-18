require("dotenv").config();
var keys = require("./keys");
var fs = require("fs");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var commandValue = process.argv[3];

switch (command) {
    case 'spotify-this-song':
        spotifyThisSong(commandValue);
        break;
    default:
        console.log("Unable to parse command!!!");
}

function spotifyThisSong(songName) {
    spotify
        .search({ type: 'track', query: songName })
        .then(function (response) {
            //get only the track information
            var items = response.tracks.items;
            //sort our tracks by most popular
            items.sort(compare);
            //select only the most popular choice        
            var track = items[items.length - 1];
            var songArtists = "\n";
            track.album.artists.forEach(artist => songArtists += artist.name + " \n");
            console.log("The artist(s) for the song " + songName + " is/are: " + songArtists);
        })
        
        .catch(function (err) {
            console.log(err);
            return;
        });
}


function compare(a, b) {
    const aTrackPopularity = a.popularity;
    const bTrackPopulatrity = b.popularity;

    let comparison = 0;
    if (aTrackPopularity > bTrackPopulatrity) {
        comparison = 1;
    } else if (aTrackPopularity < bTrackPopulatrity) {
        comparison = -1;
    }
    return comparison;
}











//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`

// ### What Each Command Should Do

// 1. `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.





// * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

// * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

// * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

// * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

// * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

// * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).
