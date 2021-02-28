const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, DELETE, OPTIONS'
    );
    next();
});

app.use(bodyParser.json());

app.use('/api', require('../server/controllers/search'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
