//midware
// const multer = require("multer");
// const {GridFsStorage} = require("multer-gridfs-storage");
// const storage = new GridFsStorage({
//     url: 'mongodb+srv://zz1999526:Zhouzhe526@cluster0.lwbk2we.mongodb.net/?retryWrites=true&w=majority/Data',
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg"];

//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-inventory-${file.originalname}`;
//             return filename;
//         }

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-inventory-${file.originalname}`,
//         };
//     },
// });

// module.exports = multer({ storage });
const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
//const dbConfig1 = require("./settings");

const dbConfig = {
    //url: "mongodb+srv://zz1999526:Zhouzhe526@cluster0.lwbk2we.mongodb.net/Lab2?retryWrites=true&w=majority",
    url:'mongodb://mongo:27017/Lab2',
    database: "Lab2",
    imgBucket: "photos",
};


var storage = new GridFsStorage({
    url: dbConfig.url,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = file.originalname;
            return filename;
        }

        return {
            bucketName: dbConfig.imgBucket,
            filename: file.originalname
        };
    }
});
var uploadFiles = multer({ storage: storage }).array("file", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;