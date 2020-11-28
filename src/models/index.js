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
db.users = require('./user.model')(sequelize, Sequelize);
db.tournaments = require('./tournament.model')(sequelize, Sequelize);
db.platforms = require('./platform.model')(sequelize, Sequelize);
db.games = require('./game.model')(sequelize, Sequelize);
db.teams = require('./team.model')(sequelize, Sequelize);

// Tables intermédiaires
db.user_tournaments = require('./user_tournament.model')(sequelize, Sequelize);
db.tournament_platforms = require('./tournament_platforms.model')(sequelize, Sequelize);
db.tournament_games = require('./tournament_games.model')(sequelize, Sequelize);
db.game_platforms = require('./game-platform.model')(sequelize, Sequelize);

module.exports = db;