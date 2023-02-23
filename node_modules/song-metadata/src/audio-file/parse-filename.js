import path from 'path';

module.exports = function (filepath) {
    let filename = path.basename(filepath);

    let parsedData = {
        filename: filename,
        extension: parseExtension(filename),
        artist: parseArtist(filename),
        title: parseTitle(filename)
    };
    return parsedData;
};

function parseExtension(filename) {
    let extension = filename.slice(-3) || null;
    return extension;
}

function parseArtist(filename) {
    let filenameNoExtension = filename.slice(0, -4);
    let hyphenIndex = filename.indexOf('-');
    let artist = hyphenIndex > 0 ? filenameNoExtension.substring(0, hyphenIndex) : null;
    return artist ? artist.trim() : artist;
}

function parseTitle(filename) {
    let filenameNoExtension = filename.slice(0, -4);
    let hyphenIndex = filename.indexOf('-');
    let title = hyphenIndex > -1 ? filenameNoExtension.substring(hyphenIndex + 1) : filenameNoExtension;
    return title ? title.trim() : title;
}