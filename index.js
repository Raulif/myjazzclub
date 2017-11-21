const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const session = require('express-session')
const csurf = require('csurf')
const morgan = require('morgan')


app.use(morgan('dev'));

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
// app.use(csurf())


if (process.env.NODE_ENV !== 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}

app.use('/api', require('./routes/api'))
app.use('/auth', require('./routes/auth'))
app.use('/admin', require('./routes/admin'))

//ROUTES:

app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
});



app.listen(8080, function() {
    console.log("I'm listening.")
});
