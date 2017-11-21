const router = require('express').Router();
const db = require('../modules/db-queries');
const { getToday } = require('../utils/helper-functions')

router.get('/shows/', (req, res) => {

    const today = getToday()

    return db.getAllCurrentShows(today)

            .then(shows => res.json({success: true, shows}))

            .catch(err => {
                console.log('error on // ROUTES // API // QUERY GET CURRENT ALL SHOWS: ', err);
            })
})

router.post('/shows/', (req, res)=> {
    res.json({success: true})
})


module.exports = router
