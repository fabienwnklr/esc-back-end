require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
const cors = require('cors')

// Request parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

// *Models
const db = require('./src/models');


// ? Routes
require('./src/routes/user.routes')(app);
require('./src/routes/tournament.routes')(app);

// ! force true à retirer en mise en prod !
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
});

