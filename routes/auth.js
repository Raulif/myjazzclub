const router = require('express').Router();
const db = require('../modules/db-queries');
const { getAdminInfo } = require('../modules/db-queries')
const { hashPassword, checkPassword } = require('../modules/hasher');


//LOGIN ADMIN
router.post('/login', (req, res) => {
    console.log(req.body);
    if(!req.body.username || !req.body.password) {
        console.log('fields missing!');
        res.json({success: false})
    }
    else {
        const username = req.body.username;
        const enteredPassword = req.body.password;

        return getAdminInfo(username)
            .then(results => {

            if(results.length < 1) {
                console.log('wrong login data');
                res.json({success: false})
            }

            else {

                const adminData = results
                const adminPasswordFromDatabase = adminData.password

                // checkPassword(plainPassword, passwordFromDatabase)
                // .then(() => {

                if(adminPasswordFromDatabase === enteredPassword) {

                    req.session.admin = {
                        id: adminData.id,
                        username: adminData.username
                    }
                    res.json({
                        success: true
                    })
                }
                //

            }
        }).catch(err => {
            console.log('error on // ROUTES // AUTH // ADMIN LOGIN: ', err);
            })
    }
})

module.exports = router
