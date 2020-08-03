require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
const cors = require('cors')

// Request parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5000' }));

const db = require('./src/models');

// ! force true à retirer en mise en prod !
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

require('./src/routes/user.routes')(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});