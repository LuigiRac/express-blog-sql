const express = require('express');
const postController = require('./controllers/postController');
const port = process.env.PORT || 3000;
const app = express();

// REQ MIDDLEWARES //
const errorsHandler = require('./middlewares/errorsHandler');
const notFound = require('./middlewares/notFound');

const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send('Home page')
});
app.get('/posts', postController.index);
app.delete('/posts/:id', postController.destroy);
app.get('/posts/:id', postController.show);


app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});