const router = require('express').Router();
const db = require('../modules/db-queries');
const { getAdminInfo } = require('../modules/db-queries')
const { hashPassword, checkPassword } = require('../modules/hasher');


//LOGIN ADMIN

router.post('/login', (req, res) => {

    if(!req.body.username || !req.body.password) {
        //check if the user entered both user name and password in the form
        console.log('fields missing!');
        res.json({success: false})
    }

    else {

        const username = req.body.username;
        const enteredPassword = req.body.password;

        //retrive the admin info from the users table, using the user name entered.

        return getAdminInfo(username)
            .then(results => {

            if(results.length < 1) {
                //if noen results are returned by the query, login failed
                console.log('wrong login data');
                res.json({success: false})
            }

            else {

                const adminData = results
                const adminPasswordFromDatabase = adminData.password

                /*
                we compare the password entered by the user, with that stored
                on the db table.
                */
                if(adminPasswordFromDatabase === enteredPassword) {
                    /*
                    if the password matches, we create a cookie-session for 'admin'.
                    */
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
