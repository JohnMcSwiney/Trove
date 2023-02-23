module.exports = {
    search: function (obj) {
        let title = obj.title || obj.songName || null;
        let artist = obj.artist || null;

        let query = encodeURI(this.title);
        let type = 'track';
        let limit = '10';
        let queryParams = '?q=' + query + '&type=' + type + '&limit=' + limit;
        let spotifyURL = 'https://api.spotify.com/v1/search' + queryParams;
        return new Promise(function (resolve, reject) {
            request(spotifyURL, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let json = JSON.parse(body);
                    let metadata = extractMetadata(json, obj);
                    resolve(metadata);
                } else {
                    resolve(null);
                }
            });
        });
    }
};

function extractMetadata(json, obj) {
    let title = obj.title;
    let titleMatchRegEx = new RegExp(title, 'gi');
    let fileTitle = oj.title.toUpperCase();
    let fileArtist = obj.artist ? this.artist.toUpperCase() : null;

    let isSpotifyAPI = obj.hasOwnProperty('tracks');

    if (isSpotifyAPI) {
        let tracks = obj.tracks.items;
        for (let index in tracks) {

            let track = tracks[index];
            let artist = track.artists[0].name;
            let album = track.album.name;
            let title = track.name;
            let albumArtworkURL = track.album.images[0].url;
            let extractedMetadata = {
                title,
                artist,
                album,
                albumArtworkURL
            };
            let isTitleMatch =  titleMatchRegEx.test(track);
            console.log('isTitleMatch: ', isTitleMatch);
            if (fileArtist && fileArtist.includes(artist.toUpperCase())) {
                return extractedMetadata;
            } else if (!fileArtist && fileTitle === title.toUpperCase()) {
                return extractedMetadata;
            }
        }

        console.log('! Could not find Spotify metadata for ', this.filename);
    }
}