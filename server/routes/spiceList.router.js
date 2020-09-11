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
    let queryText = `SELECT * FROM "spices"
WHERE "spices".user_id = $1`;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows)
        })
        .catch(error => {
            console.log('error in spicelist get request', error);
            res.sendStatus(500);
        })

});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const queryText =
    `INSERT INTO "spices" ("name", "exp_date", "user_id")
    VALUES ($1, $2, $3)
    RETURNING "id";`;
    pool.query(queryText, [req.body.name, req.body.exp_date, req.user.id])
    .then(result => {
        console.log('new spice id', result.rows[0].id)
        const newSpiceId = result.rows[0].id
        const secondQueryText = 
        `INSERT INTO "spices_categories" ("categories_id", "spices_id")
        VALUES($1, $2);`
        req.body.categories_id.map((category_id, i) => {
            pool.query(secondQueryText, [category_id, newSpiceId])
            .then(result => {
                res.sendStatus(201);
            }).catch(err => {
                // catch for second query
                console.log(err);
                res.sendStatus(500)
              })
        })
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
      })
});

// DELETE REQUEST?!
router.delete('/:id', rejectUnauthenticated, (req,res)=> {
    console.log(req.params.id)
    const queryText = 
    `DELETE FROM "spices"
    WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then (result => {
        res.sendStatus(200)
    }) .catch(error => {
        res.sendStatus(500)
    })
})

// PUT REQUEST
router.put('/:id', (req,res) => {
    let id = req.params.id
    const queryText = 
    `BEGIN;

    UPDATE "spices"
    SET "name" = $1, "exp_date = $2"
    WHERE "id" = $3;

    DELETE FROM "spices_categories"
    WHERE "spices_id" = $4;

    COMMIT;`

    pool.query(queryText, [req.body.name, req.body.exp_date, id, id])
    .then (result => {
        console.log('new spice id', result.rows[0].id)
        const newSpiceId = result.rows[0].id
        const secondQueryText = 
        `INSERT INTO "spices_categories" ("categories_id", "spices_id")
        VALUES($1, $2);`
        req.body.categories_id.map((category_id, i) => {
            pool.query(secondQueryText, [category_id, newSpiceId])
            .then(result => {
                res.sendStatus(201);
            }).catch(err => {
                // catch for second query
                console.log(err);
                res.sendStatus(500)
              })
            })
}).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;