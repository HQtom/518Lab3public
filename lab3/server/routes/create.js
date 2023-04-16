var express = require('express');
var router = express.Router();
const mongoConnection = require('../config/mongoCollection');
const datainfo = mongoConnection.Datainfo;
// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb+srv://zz1999526:Zhouzhe526@cluster0.lwbk2we.mongodb.net/?retryWrites=true&w=majority'; 
// const dbName = 'Data'; 
// const client = new MongoClient(url,{ useUnifiedTopology: true }); 



router.get('/', async (req, res, next) => {
  res.status(200).json();
});


router.post('/', async (req, res, next) => {
  console.log(req.body);
  let a = req.body;

  const datainfoCollection = await datainfo();
  try{
    await datainfoCollection.insertOne({ "name": a.name, "quantity": a.quantity ,"image":a.image});
    res.status(200).json('new inventory item done');
      
  }catch(e){
    console.log(e);
  }


});


module.exports = router;