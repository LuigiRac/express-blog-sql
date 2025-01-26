const connection = require('../db');

function index(req, res) {
    const query = 'SELECT * FROM posts';

    connection.query(query, (err, results) => {
        res.json(results);
    });
}


function destroy(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM posts WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        res.status(200).json({ message: `Post ${id} cancellato` });
    });

}

module.exports = { index, destroy };