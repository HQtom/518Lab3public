const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
let {ObjectId} = require("mongodb")
// router.post("/upload", upload.single("file"), async (req, res) => {
//     if (req.file === undefined) return res.send("you must select a file.");
//     const imgUrl = `http://localhost:4000/file/${req.file.filename}`;
//     return res.send(imgUrl);
// });

//module.exports = router;
const dbConfig = {
  //url: "mongodb+srv://zz1999526:Zhouzhe526@cluster0.lwbk2we.mongodb.net/Lab2?retryWrites=true&w=majority",
  url:'mongodb://mongo:27017/Lab2',
  //mongodb+srv://zz1999526:Zhouzhe526@cluster0.lwbk2we.mongodb.net/test
  database: "Lab2",
  imgBucket: "photos",
};

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;

const baseUrl = "http://localhost:4000/files/";

const mongoClient = new MongoClient(url);



const uploadFiles = async (req, res) => {
  try {
    console.log("req");
    //await upload(req, res);
    console.log(req);
    await upload(req, res);
    let files = req.files;
    let imagereturnID = files.map((id)=>{return id.id});
    console.log(req.file);

    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
        pid :imagereturnID 
      });
    }

    return res.send({
      message: "File has been uploaded.",
    });
  } catch (error) {
    console.log(error);

    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database);
    const images = database.collection(dbConfig.imgBucket + ".files");

    const cursor = images.find({});

    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const download = async (req, res) => {
  try {
    console.log(1);
    let _connection = await MongoClient.connect(dbConfig.url)
    let _db = await _connection.db(dbConfig.database);

    const bucket = new GridFSBucket(_db, {
      bucketName: dbConfig.imgBucket,
    });
  
    let downloadStream = bucket.openDownloadStream(new ObjectId(req.params.name) );

    downloadStream.on("data", function (data) {

      return res.status(200).write(data);
    });
    
    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  uploadFiles,
  getListFiles,
  download,
};