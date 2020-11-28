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
db.user = require('./user.model')(sequelize, Sequelize);
db.tournament = require('./tournament.model')(sequelize, Sequelize);
db.platform = require('./platform.model')(sequelize, Sequelize);
db.game = require('./game.model')(sequelize, Sequelize);
db.team = require('./team.model')(sequelize, Sequelize);

// Tables intermédiaires
db.user_tournament = require('./user_tournament.model')(sequelize, Sequelize);
db.tournament_platform = require('./tournament_platform.model')(sequelize, Sequelize);
db.tournament_game = require('./tournament_game.model')(sequelize, Sequelize);
db.game_platform = require('./game_platform.model')(sequelize, Sequelize);

module.exports = db;