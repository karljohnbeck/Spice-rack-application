const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user', req.user.id);
    let queryText = 
    `SELECT * FROM "categories"
WHERE  "categories".user_id = $1
ORDER BY categories.name ASC;`
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows)
        })
        .catch(error => {
            console.log('error in categories get request', error);
            res.sendStatus(500);
        })

});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
});

module.exports = router;
