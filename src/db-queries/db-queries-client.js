const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || 'postgres:rauliglesias:Fourcade1@localhost:5432/myjazzclub');


// GET ALL CURRENT AND FUTURE SHOWS

module.exports.getAllCurrentShows = (today) => {
    console.log('in db-queries get all current shows query');
    const query = `SELECT   *
                    FROM    shows
                    WHERE   show_date = $1::DATE
                    OR     show_date > $1::DATE
                    ORDER BY show_date ASC`

    return  db.query(query, [today])
            .then((results) => {
                return results.rows

            })
            .catch(err => {
                console.log('error on // DB-QUERIES // QUERY GET ALL CURRENT SHOWS: ', err);
            })
}
