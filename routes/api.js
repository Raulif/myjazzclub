const router = require('express').Router();
const db = require('../modules/db-queries');
const { getToday } = require('../utils/helper-functions')


//GET THE LIST OF SHOWS FOR THE FRONT WEBSITE

router.get('/shows/', (req, res) => {

    /*
    We use today's date on the db query to retrieve shows with a date later than
    today.
    */

    const today = getToday()

    return db.getAllCurrentShows(today)

            .then(shows => res.json({success: true, shows}))

            .catch(err => {
                console.log('error on // ROUTES // API // QUERY GET CURRENT ALL SHOWS: ', err);
            })
})

module.exports = router
