module.exports = (sequelize) => {
    sequelize.models.Tournament.belongsToMany(sequelize.models.Game, {
        through: 'tournament_game',
        as: 'games',
    });
    sequelize.models.Game.belongsToMany(sequelize.models.Tournament, {
        through: 'tournament_game',
        as: 'tournaments',
    });


    sequelize.models.Tournament.hasOne(sequelize.models.game_mode, {
        as: 'gameMode',
    });
    sequelize.models.game_mode.belongsToMany(sequelize.models.Tournament, {
        through: 'tournament_game_mode',
        as: '',
    });


    sequelize.models.Tournament.belongsToMany(sequelize.models.Platform, {
        through: 'tournament_platform',
        as: 'platforms',
    });
    sequelize.models.Platform.belongsToMany(sequelize.models.Tournament, {
        through: 'tournament_platform',
        as: 'tournaments',
    });


    sequelize.models.Game.belongsToMany(sequelize.models.Platform, {
        through: 'platform_game',
        as: 'platforms',
    });

    sequelize.models.Platform.belongsToMany(sequelize.models.Game, {
        through: 'platform_game',
        as: 'games',
    });


    sequelize.models.Tournament.belongsToMany(sequelize.models.User, {
        through: 'user_tournament',
        as: 'users',
    });
    sequelize.models.User.belongsToMany(sequelize.models.Tournament, {
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


    sequelize.models.Game.belongsToMany(sequelize.models.Platform, {
        through: 'game_per_platform',
        as: 'gamesPlatform'
    });
    sequelize.models.Platform.belongsToMany(sequelize.models.Game, {
        through: 'game_per_platform',
        as: 'platformsGame'
    });
}