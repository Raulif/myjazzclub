const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const session = require('express-session')
const csurf = require('csurf')
const { hashPassword, checkPassword } = require('./src/utils/hasher')
const multer = require('multer')
const uidSafe = require('uid-safe')
const path = require('path')
const toS3 = require('./toS3').toS3;
const db = require('./src/db-queries/db-queries-client')


var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 6000000
    }
});

var getToday = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today
}


app.use(compression());
app.use('/public', express.static(`${__dirname}/public`))
app.use('/uploads', express.static(`${__dirname}/uploads`))

app.use(cookieSession({
    secret: 'a really hard to guess secret',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(csurf())


if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}

app.get('/api/shows/get-all-current-shows', (req, res) => {

    let today = getToday()

    return db.getAllCurrentShows(today)
            .then(shows => {

                res.json({
                    success: true,
                    shows
                })
            })
            .catch(err => {
                console.log('error on // INDEX // API SHOWS // QUERY GET CURRENT ALL SHOWS: ', err);
            })
})




app.get('*', function(req, res){
    if(!req.session.user) {
        res.redirect('/')
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(8080, function() {
    console.log("I'm listening.")
});

//LOGIN ADMIN
// app.post('/adminlogin', (req, res) => {
//     if(!req.body.username || !req.body.password) {
//         console.log('fields missing!');
//         res.json({success: false})
//     }
//     else {
//         var usernam = req.body.username;
//         var plainPassword = req.body.password;
//
//         const qUserLogin = `SELECT * FROM users WHERE username = $1`
//         const params = [username]
//
//         db.query(qUserLogin, params).then((results) => {
//             if(results.rowCount < 1) {
//                 console.log('wrong login data');
//                 res.json({success: false})
//             } else {
//                 const userData = results.rows[0]
//                 const hashedPasswordFromDatabase = userData.password
//                 checkPassword(plainPassword, hashedPasswordFromDatabase).then(() => {
//                     req.session.user = {
//                         id: userData.id,
//                         username: userData.firstname,
//                     }
//                     res.json({
//                         success: true
//                     })
//                 }).catch(err => console.log("THERE WAS AN ERROR IN /attemptlogin",err));
//             }
//         })
//     }
// })
