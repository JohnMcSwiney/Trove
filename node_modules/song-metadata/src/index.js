import AudioFile from './audio-file';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import prettyjson from 'prettyjson';

init();

function init() {
    clear();
    const TITLE = figlet.textSync('Song Metadata', {
        horizontalLayout: 'full'
    });
    const OPTIONS = [{
        type: 'list',
        name: 'option',
        message: 'Where are your music files located?',
        choices: ['Auto', 'iTunes', 'Custom'],
        filter: function (val) {
            return val.toLowerCase();
        }
    }];
    log(chalk.blue(TITLE));
    inquirer.prompt(OPTIONS).then((selection) => {
        main(selection);
    });
}

function main(selection) {
    let option = selection.option || 'auto';
    let directory = null;

    switch (option) {
        case 'auto':
            const CONFIRMATION_QUESTION = {
                type: 'list',
                name: 'confirmation',
                message: 'Are you sure? This will scan almost every file on your computer and will take a long time.',
                choices: ['Yes', 'No'],
                filter: function (val) {
                    return val.toLowerCase();
                }
            };
            inquirer.prompt(CONFIRMATION_QUESTION).then(function (answer) {
                let isConfirmed = answer.confirmation === 'yes';
                if (isConfirmed) walkDirectoryForAudioFiles(os.homedir());
                else init();
            });
            break;
        case 'itunes':
            //TODO
            directory = os.homedir() + '\\Music\\iTunes\\iTunes Media';
            walkDirectoryForAudioFiles(directory);
            // directory = "M:/Audio/Music";
            break;
        case 'custom':
            //TODO
            const CUSTOM_DIRECTORY_QUESTION = {
                type: 'input',
                name: 'custom_directory',
                message: 'What directory would you like to scan?',
                default: function () {
                    return os.homedir() + '\\Downloads';
                }
            };
            inquirer.prompt(CUSTOM_DIRECTORY_QUESTION).then(function (answer) {
                walkDirectoryForAudioFiles(answer.custom_directory);
            });
            break;
        default:
            directory = __dirname;
    }

    // return false;

}


function walkDirectoryForAudioFiles(directory) {
    log(`Finding audio files in ${directory}...`, 'white');

    let audioFiles = [];
    let modifiedAudioFiles = [];
    let unmodifiedAudioFiles = [];
    let count = 0;
    let isDone = false;

    fs.walk(directory)
        .on('data', (file) => {
            isDone = false;
            let filepath = file.path;
            if (isAudioFile(filepath)) {
                audioFiles.push(filepath);
                let audioFile = new AudioFile(filepath);
                audioFile.getCurrentMetadata().then((originalMetadata) => {
                    // Prerequisites for getting new metadata
                    let condition = !originalMetadata.album;
                    if (condition) {
                        audioFile.getExternalMetadata().then((externalMetadata) => {
                            audioFile.writeMetadata(externalMetadata).then(() => {
                                count++;
                                modifiedAudioFiles.push(filepath);

                                log(`\n${count}. Audio File: ${filepath}`, 'yellow');
                                log('- Original metadata: ');
                                log(originalMetadata, 'gray');

                                switch (externalMetadata.source) {
                                    case 'spotify':
                                        log('- Updated metadata from Spotify: ', 'green');
                                        break;
                                    case 'json':
                                        log('- Updated metadata from local JSON file: ');
                                        break;
                                    default:
                                        log('- Updated metadata from unknown source: ');
                                }

                                log(externalMetadata, 'blue');
                            });
                        });
                    } else {
                        unmodifiedAudioFiles.push(filepath);
                    }
                });
            }
        })
        .on('end', function () {});
}

function analyzeFiles(files) {

    files.forEach(function (filepath) {
        if (isAudioFile(filepath)) {
            console.log('Audio File: ', filepath);
            // let audioFile = new AudioFile(filepath);
            // audioFile.writeMetadata();
        }
    });
}

function isAudioFile(file) {
    const REGEX_AUDIO_FILE_TYPES = /\.m((p3)|(4a))$/;
    let isAudioFile = REGEX_AUDIO_FILE_TYPES.test(file);

    if (isAudioFile) return true;

    // console.log(file + ' is not an audio file');
    return false;
}

function log(message, color) {
    let chockColor = chalk[color] || chalk.white;
    let isObject = typeof message === 'object';
    if (isObject) {
        let options = {
            noColor: true
        };
        console.log(chockColor(prettyjson.render(message, options)));
    } else {
        console.log(chockColor(message));
    }
}