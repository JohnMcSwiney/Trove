import fs from 'fs';
import ffmetadata from 'ffmetadata';
import request from 'request';
import jsonfile from 'jsonfile';

module.exports = {

    read: function (filepath) {
        return new Promise(function (resolve, reject) {
            ffmetadata.read(filepath, function (err, data) {
                if (err) {
                    console.error("Error reading metadata", err);
                    reject();
                } else {
                    let metadata = {
                        title: data.title,
                        artist: data.artist,
                        album: data.album,
                        albumArtwork: data.albumArtwork,
                        genre: data.genre
                    };
                    resolve(metadata);
                }
            });
        });
    },

    write: function (filepath, metadata) {
        metadata = toFFMPEG(metadata);
        let hasArtwork = metadata.albumArtworkPath ? true : false;
        let options = {};

        if (hasArtwork) {
            options.attachments = [metadata.albumArtwork];
        }

        ffmetadata.write(filepath, metadata, options, function (err) {
            if (err) console.error("Error writing metadata", err);
            else {
                if (hasArtwork) {
                    // remove album artwork
                    fs.unlink(options.attachments[0]);
                }
                // console.log("Metadata written to  ", filepath);
            }
        });
    },

    getMetadataFromJSONFile: function (filepath) {
        let isValidJSON = fs.existsSync(filepath) && filepath.indexOf('.json') > -1;

        if (!isValidJSON) return false;

        let metadata = jsonfile.readFileSync(filepath);
        return metadata;
    },

    getMetadataFromSpotify: function (options) {
        let self = this;
        let songTitle = options.title || null;
        let songArtist = options.artist || null;
        let songAlbum = options.album || null;
        let type = null,
            query = null,
            limit = null;

        if (songTitle) {
            type = 'track';
            query = encodeURI(songTitle);
            limit = 10;
        } else if (songArtist) {
            type = 'artist';
            query = encodeURI(songArtist);
            limit = 5;
        } else if (songAlbum) {
            type = 'album';
            query = encodeURI(songAlbum);
            limit = 3;
        } else {
            return false;
        }

        let queryParams = '?q=' + query + '&type=' + type + '&limit=' + limit;
        let spotifyURL = 'https://api.spotify.com/v1/search' + queryParams;

        return new Promise(function (resolve, reject) {
            request(spotifyURL, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let spotifyObj = JSON.parse(body);
                    // @TODO only supports searching by track at the moment
                    let matchedMetadata = getMatchingTitleMetadata(spotifyObj, options);
                    resolve(matchedMetadata);
                } else {
                    resolve(null);
                }
            });
        });
    }
};

function toFFMPEG(metadata) {
    let ffmpeg = {
        title: metadata.title || metadata.songName || '',
        artist: metadata.artist || metadata.author || '',
        album: metadata.album || '',
        albumArtwork: metadata.albumArtwork || metadata.albumArtworkURL || ''
    };
    return ffmpeg;
}

function encodeURI(uri) {
    let encoded = uri;
    // White space
    encoded = encoded.replace(/\s/g, '+');
    // & => %26
    encoded = encoded.replace(/&/g, '%26');
    // ' => %27
    encoded = encoded.replace(/'/g, '%27');
    // ( => %28
    encoded = encoded.replace(/\(/g, '%28');
    // ) => %29
    encoded = encoded.replace(/\)/g, '%29');
    return encoded;
}

function getMatchingTitleMetadata(spotifyObj, options) {
    let songTitle = options.title ? options.title.toUpperCase() : null;
    let songArtist = options.artist ? options.artist.toUpperCase() : null;

    let tracks = spotifyObj.tracks.items;
    let possibleMatches = [];

    for (let index in tracks) {

        let track = tracks[index];
        let artist = track.artists[0].name;
        let album = track.album.name;
        let title = track.name;
        let albumArtworkURL = track.album.images[0].url;
        let trackMetadata = {
            title,
            artist,
            album,
            albumArtworkURL
        };
        possibleMatches.push(trackMetadata);
        let isMatchingTrack = (songArtist && songArtist.includes(artist.toUpperCase())) || !songArtist && songTitle === title.toUpperCase();
        if (isMatchingTrack) return trackMetadata;
    }
    // console.log('Could not find match for ' + songTitle + ' in: ', possibleMatches);
    return false;
}