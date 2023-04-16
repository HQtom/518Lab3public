var express = require('express');
var router = express.Router();
const mongoConnection = require('../config/mongoCollection');
const datainfo = mongoConnection.Datainfo2;
router.get('/', async (req, res, next) => {

});


router.post('/', async (req, res, next) => {

    console.log(req.body);
    let a = req.body;
    let email = { "email": a.email }
    try {
        //await datainfoCollection.find(email);
        const datainfoCollection = await datainfo();
        let data = await datainfoCollection.find(email).toArray();;
        console.log(data);
        if (data .length==0) {
            res.status(200).json({ msg: "account is not exists" });
        } else {
            if (data[0].password == a.password) {
                let b = { email: data[0].email, name: data[0].name }
                res.status(200).json(b);
            } else {
                res.status(200).json({ msg: "wrong password or email" });
            }
        }

    } catch (e) {
        console.log(e);
    }

    res.status(200).json();

});


module.exports = router;