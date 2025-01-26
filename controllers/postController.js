const connection = require('../db');

function index(req, res) {
    const query = 'SELECT * FROM posts';

    connection.query(query, (err, results) => {
        res.json(results);
    });
}

module.exports = { index };