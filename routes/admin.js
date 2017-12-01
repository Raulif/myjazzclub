const router = require('express').Router();
const db = require('../modules/db-queries');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const session = require('express-session');
const path = require('path');
const multer = require('multer')
const uidSafe = require('uid-safe')
const toS3 = require('../modules/toS3').toS3;

//Multer saves files with size of up to 6MB to the local 'uploads' folder

let diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null,__dirname + '/../uploads/');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});

let uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 6000000
    }
});



//FILTER IF NOT LOGGED IN

router.get('/', (req, res) => {
    if(!req.session.admin) {
        res.redirect('/')
    } else {
        res.sendFile(path.resolve(__dirname + '/../index.html'));
    }
});


//------------------ SHOW / SHOW EDITOR ROUTES -------------------------------//


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


// POST NEW SHOW TO SHOWS TABLE

router.post('/new-show', (req, res) => {

    const newShow = req.body;
    return db.createNewShow(newShow)

            .then(result => {
                console.log('result at new show: ', result);
                if(result.success) {
                    newShow.id = result.id
                    res.json({
                        success: true,
                        newShow

                    })
                }
            })

            .catch(err => console.log('error on ROUTES // ADMIN // POST NEW SHOW: ', err))
})


//UPDATE EXISTING SHOW

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

// UPLOAD NEW SHOW PICTURE

router.post('/upload-picture/:currentShowId', uploader.single('file'), (req, res) => {
    const currentShowId = req.params.currentShowId

    if(req.file) {
        toS3(req.file)

        .then(() => {
            return db.uploadPicture(req.file.filename, currentShowId)

            .then(results => {
                if(results.success) {
                    res.json({
                        success: true,
                        picture_name: req.file.filename
                    })
                }

            })
            .catch(err => console.log('error on ROUTES // ADMIN // DB UPLOAD-PICTURE: ', err))
        })
        .catch(err => console.log('error on ROUTES // ADMIN // TOS3 UPLOAD PICTURE: ', err))

    }

})



//------------------ GALLERY / GALLERY MANAGER ROUTES ------------------------//


//UPDATE CURRENT PICTURE AND ITS INFO

router.post('/gallery/update-picture', (req, res) => {

    const updatedPicture = req.body;

    return db.updatePicture(updatedPicture)

            .then(result => {
                if(result.success) {
                    res.json({
                        success: true,
                        updatedPicture
                    })
                }
            })

            .catch(err => console.log('error on ROUTES // ADMIN // UPDATE PICTURE: ', err))
})


//POST UPLOAD NEW GALLERY PICTURE

router.post('/gallery/upload-new-picture', uploader.single('file'), (req, res) => {
    if(req.file) {

        toS3(req.file)

        .then(() => {
            return db.createNewGalleryPicture(req.file.filename)

            .then(results => {
                if(results.success) {
                    res.json({
                        success: true,
                        id: results.id,
                        file_name: req.file.filename
                    })
                }
            })
            .catch(err => console.log('error on ROUTES // ADMIN // DB CREATE NEW GALLERY PICTURE: ', err))
        })
        .catch(err => console.log('error on ROUTES // ADMIN // TOS3 UPLOAD NEW GALLERY PICTURE: ', err))
    }
})


// GET ALL PICTURES FROM DB

router.get('/get-pictures', (req, res) => {

    return db.getPictures()

            .then( results => {
                if(results.success) {

                    res.json({
                        success: true,
                        pictures: results.pictures
                    })
                }
            })

            .catch(err => console.log('error on ROUTES // ADMIN // GET PICTURES: ', err))
})


// GET CURRENT PICTURE FROM DB

router.get('/current-picture', (req, res) => {

    return db.getCurrentPicture()

            .then( results => {
                if(results.success) {

                    res.json({
                        success: true,
                        currentPicture: results.currentPicture
                    })
                }
            })

            .catch(err => console.log('error on ROUTES // ADMIN // GET CURRENT PICTURE: ', err))
})

module.exports = router;
