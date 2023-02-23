import metadata from './metadata';
import parseFilename from './parse-filename';

let AudioFile = module.exports = function (filepath) {
    let parsedData = parseFilename(filepath);

    this.filepath = filepath;
    this.filename = parsedData.filename;
    this.artist = parsedData.artist;
    this.title = parsedData.title;
    this.album = parsedData.album;
    this.extension = parsedData.extension;
};

AudioFile.prototype.getCurrentMetadata = function () {
    let filepath = this.filepath;
    return new Promise((resolve, reject) => {
        resolve(metadata.read(filepath));
    });
};

AudioFile.prototype.getExternalMetadata = function () {
    let self = this;
    let filepath = this.filepath;
    let possibleLocalJSONFilePath = filepath.substring(0, filepath.length - 3) + 'json';

    return new Promise(function (resolve, reject) {

        let localMetadata = metadata.getMetadataFromJSONFile(possibleLocalJSONFilePath);
        // Local JSON File
        if (localMetadata) {
            localMetadata.source = 'json';
            resolve(localMetadata);
        } else {
            // Spotify API
            let songOptions = {
                title: self.title,
                artist: self.artist,
                album: self.album
            };
            metadata.getMetadataFromSpotify(songOptions).then(spotifyMetadata => {
                spotifyMetadata.source = 'spotify';
                resolve(spotifyMetadata);
            });
        }
    });
};

AudioFile.prototype.writeMetadata = function (newMetadata) {
    let self = this;
    return new Promise(function (resolve, reject) {
        resolve(metadata.write(self.filepath, newMetadata));
    });

};