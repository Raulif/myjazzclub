const router = require('express').Router();
const db = require('../modules/db-queries');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const session = require('express-session');
const path = require('path');


//FILTER NOT LOGGED IN

router.get('/', (req, res) => {
    if(!req.session.admin) {
        res.redirect('/')
    } else {
        res.sendFile(path.resolve(__dirname + '/../index.html'));
    }
});


//GET CURRENT SHOW FROM DB

router.get('/current-show', (req, res) => {

    return db.getCurrentShow()

            .then(currentShow => {
                res.json({
                    success: true,
                    currentShow
                })
            })

            .catch(err => console.log('error on ROUTES // ADMIN // GET CURRENT SHOW: ', err))
})


// POST NEW SHOW TO DB

router.post('/new-show', (req, res) => {

    const newShow = req.body;
    return db.createNewShow(newShow)

            .then(result => {

                if(result.success) {
                    newShow.id = result.id
                    console.log('newShow in post new show is: ', newShow);
                    res.json({
                        success: true,
                        newShow

                    })
                }
            })

            .catch(err => console.log('error on ROUTES // ADMIN // POST NEW SHOW: ', err))
})

router.post('/update-show', (req, res) => {

    const updatedShow = req.body;

    return db.updateShow(updatedShow)

            .then( result => {

                if(result.success) {

                    res.json({
                        success: true,
                        updatedShow
                    })
                }
            })

            .catch(err => console.log('error on ROUTES // ADMIN // UPDATE SHOW: ', err))
})

//
// router.post('/upload-picture/:id', (req, res) => {
//
// })


module.exports = router
