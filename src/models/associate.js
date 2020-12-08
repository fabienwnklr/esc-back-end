module.exports = (sequelize) => {
    sequelize.models.Tournament.belongsToMany(sequelize.models.Game, {
        through: 'tournament_game',
        as: 'games',
        foreignKey: 'tournament_id'
    });
    sequelize.models.Game.belongsTo(sequelize.models.Tournament, {
        through: 'tournament_game',
        as: 'tournaments',
        foreignKey: 'game_id'
    });


    sequelize.models.Tournament.belongsToMany(sequelize.models.Platform, {
        through: 'tournament_platform',
        as: 'platforms',
        foreignKey: 'tournament_id'
    });
    sequelize.models.Platform.belongsTo(sequelize.models.Tournament, {
        through: 'tournament_platform',
        as: 'tournaments',
        foreignKey: 'platform_id'
    });


    sequelize.models.Game.belongsToMany(sequelize.models.Platform, {
        through: 'platform_game',
        as: 'platforms',
        foreignKey: 'game_id'
    });

    sequelize.models.Platform.belongsTo(sequelize.models.Game, {
        through: 'platform_game',
        as: 'games',
        foreignKey: 'platform_id'
    });


    sequelize.models.Tournament.belongsToMany(sequelize.models.User, {
        through: 'user_tournament',
        as: 'users',
        foreignKey: 'tournament_id'
    });
    sequelize.models.User.belongsTo(sequelize.models.Tournament, {
        through: 'user_tournament',
        as: 'tournaments',
        foreignKey: 'user_id'
    });
}
