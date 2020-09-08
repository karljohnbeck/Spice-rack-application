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
    console.log('req.user', req.user);
    let queryText = `SELECT * FROM "spices"
WHERE "spices".user_id = $1`;
    pool.query(queryText, [req.user])
        .then(result => res.send(result.row))
        .catch(error => {
            console.log('error in spicelist get request', error);
            res.sendStatus(500);
        })

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;