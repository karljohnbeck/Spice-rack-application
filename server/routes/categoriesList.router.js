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
    `SELECT "categories".id, "categories".name, "spices".id AS "spice_id", "spices".name AS "spice_name" FROM "categories"
    JOIN "spices_categories" ON "categories".id = "spices_categories".categories_id
    JOIN "spices" ON "spices".id = "spices_categories".spices_id
    WHERE  "spices".user_id = $1;`;
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
    console.log(req.body)
    const queryText = 
    `INSERT INTO "categories" ("user_id", "name")
    VALUES ($1, $2);`;
    pool.query(queryText, [req.user.id, req.body.name])
    .then ((result) => {
        res.sendStatus(201)
    }) .catch((error) => {
        res.sendStatus(500)
        console.log(error)
    })
});

module.exports = router;