var express = require('express');
var router = express.Router();
const mongoConnection = require('../config/mongoCollection');
const datainfo = mongoConnection.Datainfo2;
router.get('/', async (req, res, next) => {
    res.status(200).json();
  });
  
  
  router.post('/', async (req, res, next) => {
    console.log(req.body);
    let a = req.body;
  
   
    try{
      //await datainfoCollection.insertOne({ "name": a.name, "email": a.email ,"password":a.password});
      const datainfoCollection = await datainfo();
      let check = await datainfoCollection.find({"email": a.email}).toArray();
      if (check.length!=0){
        res.status(200).json({ msg: "This account is exists" });
      }
      let data = await datainfoCollection.insertOne({ "name": a.name, "email": a.email ,"password":a.password});
      console.log(data);
      res.status(200).json('new account done');
        
    }catch(e){
      console.log(e);
    }
  
  
  });
  
  
  module.exports = router;