var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', async(req, res, next)=> {
  res.status(200).json({Num2:1});
});
router.post('/', async (req, res, next)=> {
  let a = req.body
  
  console.log(a)
  try{
    res.status(200).json({Num:(parseInt(a.Num)+parseInt(a.Num2))})
  }catch(e){
    res.status(404).json({error:"test error"})
  }
})

module.exports = router;
