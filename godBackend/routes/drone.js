var express = require('express');
var router = express.Router();
var droneModel = require('../models/drone')

/* GET users listing. */
router.get('/', function (req, res, next) {
  // utiliser 
  droneModel.getList().then(result => {
    res.send(result);
  })
});

module.exports = router;
