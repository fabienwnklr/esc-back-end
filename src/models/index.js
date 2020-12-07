const Sequelize = require('sequelize');
const sequelize  = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    operatorAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Tables principales
db.game = require('./game.model')(sequelize, Sequelize);
db.platform = require('./platform.model')(sequelize, Sequelize);
db.tournament = require('./tournament.model')(sequelize, Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);

module.exports = db;