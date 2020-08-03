require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')


// Request parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

const db = require('./src/models');

// ! force true à retirer en mise en prod !
db.sequelize.sync({ force: true });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// require('./src/routes/user.routes')(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});