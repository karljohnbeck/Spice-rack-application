const express = require('express');
const router = express.Router();
require('dotenv').config();
axios = require('axios')
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:search', rejectUnauthenticated, (req, res) => {
  axios.get(`https://api.edamam.com/search?q=${req.params.search}&app_id=${process.env.APP_ID}&app_key=${process.env.EDAMAM_KEY}`)
    .then((results) => res.send(results.data))
    .catch((error) => {
      console.log('Error in Recipe get route:', error);
      res.sendStatus(500);
    });
});

module.exports = router;