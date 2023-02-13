const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    //the project id
  projectId: '',

  // path to keyfile.json
  keyFilename: ''
});

const bucket = storage.bucket('trv-test');