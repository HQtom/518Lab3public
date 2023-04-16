var express = require('express');
var router = express.Router();
let  { ObjectId } = require("mongodb");
const mongoConnection = require('../config/mongoCollection');
const data = mongoConnection.Datainfo;
const dbConfig = {
    url: "mongodb+srv://zz1999526:Zhouzhe526@cluster0.lwbk2we.mongodb.net/Lab2?retryWrites=true&w=majority",
    //mongodb+srv://zz1999526:Zhouzhe526@cluster0.lwbk2we.mongodb.net/test
    database: "Lab2",
    imgBucket: "photos",
};
router.post('/', async function (req, res, next) {
    console.log(req.body);
    const UserDataCollection = await data();
    let d = req.body;
    UserDataCollection.updateOne({ "_id": new ObjectId(d._id)  },{$set: { "quantity":d.quantity, "name":d.name}} , function (err, docs) {
        if (err) {
            return console.log(err)
        }
        console.log(docs)
    })


    const UserData = await UserDataCollection.find({}).toArray();
    for (let i = 0; i < UserData.length; i++) {
        UserData[i]._id = UserData[i]._id.toString();
    }
    //return UserData;
    res.status(200).json(UserData);

});

module.exports = router;