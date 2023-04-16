const axios = require("axios");
var express = require('express');
var router = express.Router();



router.get('/', async (req, res, next) => {
    const options = {
        method: 'GET',
        url: 'https://fake-data3.p.rapidapi.com/fk/images',
        headers: {
            'X-RapidAPI-Key': 'cf84e1a815msh9da5753e7af3dfcp18f817jsnd0c96ed6b6a2',
            'X-RapidAPI-Host': 'fake-data3.p.rapidapi.com'
        }
    };


    axios.request(options).then(function (response) {
        console.log(response.data);
        res.status(200).json(response.data);
    }).catch(function (error) {
        console.error(error);
    });
    
})


module.exports = router;

