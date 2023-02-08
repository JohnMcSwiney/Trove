const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const { GridFsStorage } = require("multer-gridfs-storage");

const {
    getAllSongs,
    getSong,
    uploadSong,
    deleteSong,
    updateSong
} = require("../controllers/controller");


/*THIS STORAGE ENGINE WORKS FOR SONG DO NOT DELETE*/
// const storage = multer.diskStorage({

//     url: process.env.MONGO_URI,

//     file: (request, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString("hex") + path.extname(file.originalname);

//                 console.log(filename);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: "songs",
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     },
// });

//const upload = multer({ storage });


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'testsong/');
//     },
//     filename: function (req, file, cb) {
//         crypto.randomBytes(16, (err, buf) => {
//             if (err) {
//                 return cb(err);
//             }
//             const filename = buf.toString("hex") + path.extname(file.originalname);
//             cb(null, filename);
//         });
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'audio/mpeg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
// });

// upload.fields([{ name: 'songFile', maxCount: 1 }, { name: 'image', maxCount: 1 }])



router.get("/", getAllSongs);

router.get("/:id", getSong);

router.post("/", uploadSong);

router.delete("/:id", deleteSong);

router.patch("/:id", updateSong);

module.exports = router;
