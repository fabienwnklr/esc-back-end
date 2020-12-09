module.exports = (sequelize) => {
    sequelize.models.Tournament.belongsToMany(sequelize.models.Game, {
        through: 'tournament_game',
        as: 'games',
    });
    sequelize.models.Game.belongsTo(sequelize.models.Tournament, {
        through: 'tournament_game',
        as: 'tournaments',
    });


    sequelize.models.Tournament.belongsToMany(sequelize.models.Platform, {
        through: 'tournament_platform',
        as: 'platforms',
    });
    sequelize.models.Platform.belongsTo(sequelize.models.Tournament, {
        through: 'tournament_platform',
        as: 'tournaments',
    });


    sequelize.models.Game.belongsToMany(sequelize.models.Platform, {
        through: 'platform_game',
        as: 'platforms',
    });

    sequelize.models.Platform.belongsTo(sequelize.models.Game, {
        through: 'platform_game',
        as: 'games',
    });


    sequelize.models.Tournament.belongsToMany(sequelize.models.User, {
        through: 'user_tournament',
        as: 'users',
    });
    sequelize.models.User.belongsTo(sequelize.models.Tournament, {
        through: 'user_tournament',
        as: 'tournaments',
    });

    
    sequelize.models.Game.belongsToMany(sequelize.models.game_mode, {
        through: 'mode_per_game',
        as: 'gamesMode',
    });
    sequelize.models.game_mode.belongsToMany(sequelize.models.Game, {
        through: 'mode_per_game',
        as: 'games',
    });
}