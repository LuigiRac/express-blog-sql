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

function show(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM posts WHERE id = ?';


    const tagsSql = `SELECT T.* 
    FROM tags AS T
    JOIN post_tag AS PT ON T.id = PT.tag_id
    WHERE PT.post_id = ? `;

    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        // res.json(results[0]);

        const posts = results[0];

        connection.query(tagsSql, [id], (err, tagResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            posts.tags = tagResults;
            res.json(posts);

        })
    })
}


module.exports = { index, destroy, show };