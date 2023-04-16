var express = require('express');
var router = express.Router();
require("dotenv").config();
/* GET home page. */
const upload = require("./route/upload");
var createsRouter = require('./create');
const users = require("./users")
const update = require("./update")
const delete1 = require("./delete")
const Num = require("./Num")
const fakedata1 = require("./fakedata")
const login = require("./login")
const Register = require("./Register")
//var uploadRouter = require('./route/upload');
//var middlesRouter = require('./routes/middleware/upload');
//app.use("/file", upload);

// let routes = app => {
//   router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//   router.post("/upload", upload.uploadFiles);
//   router.get("/files", upload.getListFiles);
//   router.get("/files/:name", upload.download);

//   return app.use("/", router);
// };
const constructorMethod = (app) => {
  app.use('/create', createsRouter);
  app.post("/upload", upload.uploadFiles);
  app.get("/files", upload.getListFiles);
  app.get("/files/:name", upload.download);
  app.use('/users',users)
  app.use('/update',update)
  app.use('/delete',delete1)
  app.use('/fakedata',fakedata1)
  app.use('/Num',Num)
  app.use('/login',login)
  app.use('/register',Register)
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;



