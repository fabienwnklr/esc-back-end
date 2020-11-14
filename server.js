require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const helmet = require('helmet');
const authJwt = require('./src/middleware/authJwt');
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json({
    type: ['application/json', 'text/plain']
}));


// ** Security
app.use(helmet());

// *Models
const db = require('./src/models');


// ? Routes
app.get('/api/checkToken', authJwt.verifyToken, (req, res) => {
    res.status(200).send({
        message: 'token valid'
    })
})
require('./src/routes/auth.routes')(app);
require('./src/routes/tournament.routes')(app);
require('./src/routes/game.routes')(app);
require('./src/routes/platform.routes')(app);

db.sequelize.sync({ force: false }).then(() => {
    console.log('Re-sync db.');
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
});

