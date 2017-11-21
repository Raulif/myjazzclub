const spicedPg = require('spiced-pg');
const { postgresDb } = require('../config/secrets.json')
const db = spicedPg(process.env.DATABASE_URL || postgresDb);
const multer = require('multer')
const path = require('path')
const { toS3 } = require('./toS3');
const uidSafe = require('uid-safe')



const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '../uploads');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 6000000
    }
});


// GET ALL CURRENT AND FUTURE SHOWS

module.exports.getAllCurrentShows = (today) => {
    const query = `SELECT   *, show_date::DATE
                    FROM    shows
                    WHERE   show_date = $1::DATE
                    OR      show_date > $1::DATE
                    ORDER BY show_date ASC`

    return db.query(query, [today])
            .then(results => {
                return results.rows

            })
            .catch(err => {
                console.log('error on // DB-QUERIES // QUERY GET ALL CURRENT SHOWS: ', err);
            })
}

// ADMIN LOGIN

module.exports.getAdminInfo = (username) => {
    const query = `SELECT   *
                    FROM    users
                    WHERE   username = $1`

    return db.query(query, [username])

            .then(results => {
                return results.rows[0]
            })

            .catch(err => {
                console.log('error on // DB-QUERIES // QUERY GET ADMIN INFO: ', err);
            })
}


//GET LAST CURRENT SHOW (show with highest id)

module.exports.getCurrentShow = () => {
    const query = `SELECT *, to_char(show_date, 'YYYY-MM-DD') AS show_date
                    FROM shows
                    ORDER BY id DESC
                    LIMIT 1
                    `

    return db.query(query)

            .then(results => {
                console.log(results.rows[0]);
                return results.rows[0]
            })

            .catch(err => {
                console.log('error on // DB-QUERIES // QUERY GET CURRENT SHOW: ', err);
            })
}


//CREATE NEW SHOW ON DB

module.exports.createNewShow = (newShow) => {
    const query = `INSERT INTO shows
                    (   title,
                        main_artist,
                        secondary_artist,
                        line_up,
                        genre,
                        long_description,
                        external_link,
                        show_date,
                        time_begin,
                        time_end,
                        price_pre,
                        price_door,
                        tag )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                    RETURNING id`

    const params = Object.keys(newShow).map((keyName, keyIndex) => {
                        return newShow[keyName]
                    // use keyName to get current key's name
                    // and obj[keyName] to get its value
                    })

    console.log(params);

    return db.query(query, params)

            .then(results => {

                if(results.rowCount < 1) {
                    return({
                        success: false,
                        id
                    })
                }

                return({success: true})
            })
            .catch(err => console.log('error on // DB-QUERIES // QUERY CREATE NEW SHOW: ', err))
}


//UPDATE EXISTING SHOW

module.exports.updateShow = (updatedShow) => {
    const query = `UPDATE shows
                    SET title = $1,
                        main_artist = $2,
                        secondary_artist = $3,
                        line_up = $4,
                        genre = $5,
                        long_description = $6,
                        external_link = $7,
                        show_date = $8,
                        time_begin = $9,
                        time_end = $10,
                        price_pre = $11,
                        price_door = $12,
                        tag = $13
                    WHERE id = $14`

    const params = Object.keys(updatedShow).map((keyName, keyIndex) => {
                        return updatedShow[keyName]
                    // use keyName to get current key's name
                    // and obj[keyName] to get its value
                    })

    console.log(params);

    return db.query(query, params)

            .then(() => {
                return({success: true})
            })

            .catch(err => console.log('error on // DB-QUERIES // QUERY UPDATE SHOW: ', err))

}
