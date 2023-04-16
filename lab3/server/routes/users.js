var express = require('express');
var router = express.Router();
let { ObjectId } = require("mongodb");
const MongoClient = require('mongodb').MongoClient;
const mongoConnection = require('../config/mongoCollection');
const data = mongoConnection.Datainfo;
const dbConfig = {
  url: "mongodb+srv://zz1999526:Zhouzhe526@cluster0.lwbk2we.mongodb.net/Lab2?retryWrites=true&w=majority",
  //mongodb+srv://zz1999526:Zhouzhe526@cluster0.lwbk2we.mongodb.net/test
  database: "Lab2",
  imgBucket: "photos",
};
/* GET users listing. */
router.get('/', async function (req, res, next) {

  const UserDataCollection = await data();
  const UserData = await UserDataCollection.find({}).toArray();
  for (let i = 0; i < UserData.length; i++) {
    UserData[i]._id = UserData[i]._id.toString();
  }
  //return UserData;
  res.status(200).json(UserData);

});

module.exports = router;
