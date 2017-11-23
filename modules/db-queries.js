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
    const query = `SELECT   *
                    FROM    shows
                    WHERE   show_date = $1::DATE
                    OR      show_date > $1::DATE
                    ORDER BY show_date ASC`

    return db.query(query, [today])
            .then(results => {

                let mappedResults = results.rows.map((show) => {
                            delete show.created_at;
                            show.show_date = show.show_date.toISOString().substring(0, 10)
                            return show
                        })
                return mappedResults

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
    const query = `SELECT *
                    FROM shows
                    ORDER BY id DESC
                    LIMIT 1
                    `

    return db.query(query)

            .then(results => {
                let currentShow = results.rows[0];
                delete currentShow.created_at;
                currentShow.show_date = currentShow.show_date.toISOString().substring(0, 10);

                return currentShow;
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
                        tag)
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
                    return({success: false})
                }

                return({
                    success: true,
                    id: results.rows[0].id
                })
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
                        tag = $13,
                        picture_name = $14
                    WHERE id = $15`

    const params = Object.keys(updatedShow).map((keyName, keyIndex) => {
                        return updatedShow[keyName]
                    // use keyName to get current key's name
                    // and obj[keyName] to get its value
                    })


    return db.query(query, params)

            .then(() => {
                return({success: true})
            })

            .catch(err => console.log('error on // DB-QUERIES // QUERY UPDATE SHOW: ', err)
        )

}


//UPDATE EXISTING GALLERY PICTURES

module.exports.updatePicture = (updatedPicture) => {

    const query = `UPDATE pictures
                    SET title = $1,
                        description = $2,
                        picture_date = $3
                    WHERE id = $4`

    const { title, description, picture_date, id } = updatedPicture;

    const params = [title, description, picture_date, id]

    return db.query(query, params)

            .then(() => {
                return({success: true})
            })
}

//UPDATE-UPLOAD SHOW PICTURE

module.exports.uploadPicture = (filename, currentShowId) => {
    console.log('in uploadpicture query');
    const query = `UPDATE shows
                    SET picture_name = $1
                    WHERE id = $2`

    const params = [filename, currentShowId]

    return db.query(query, params)

            .then(() => {
                return({success: true})
            })

            .catch(err => console.log('error on // DB-QUERIES // QUERY UPLOAD PICTURE: ', err))
    }


//GET ALL GALLERY PICTURES FROM DB

module.exports.getPictures = () => {

    const query = `SELECT id, file_name, title, description, picture_date
                    FROM pictures
                    ORDER BY picture_date DESC`

    return db.query(query)

            .then((results) => {
                let pictures = results.rows.map( picture => {
                    if(picture.picture_date){
                        picture.picture_date = picture.picture_date.toISOString().substring(0, 10)}

                    return picture
                })

                return ({
                    success: true,
                    pictures
                })
            })

            .catch(err => console.log('error on // DB-QUERIES // QUERY GET ALL PICTURES: ', err))
}


//GET CURRENT PICTURE

module.exports.getCurrentPicture = () => {

    const query = `SELECT id, file_name, title, description, picture_date
                    FROM pictures
                    ORDER BY id DESC
                    LIMIT 1
                    `

    return db.query(query)

            .then(results => {
                if(results.rowCount > 0) {

                    let currentPicture = results.rows[0]

                    if(currentPicture.picture_date) {
                        currentPicture.picture_date = currentPicture.picture_date.toISOString().substring(0, 10)
                    }

                    return({
                        success: true,
                        currentPicture
                    })

                }
            })

            .catch(err => console.log('error on // DB-QUERIES // QUERY GET CURRENT PICTURE: ', err))
}


//CREATE NEW GALLERY PICTURE

module.exports.createNewGalleryPicture = (fileName) => {

    const query = `INSERT INTO pictures
                    (file_name)
                    VALUES ($1)
                    RETURNING id`

    return db.query(query, [fileName])

    .then(results => {
        if(results.rowCount < 1) {
            return({success: false})
        }

        return({
            success: true,
            id: results.rows[0].id
        })
    })
    .catch(err => console.log('error on // DB-QUERIES // QUERY CREATE NEW GALLERY PICTURE: ', err))
}
