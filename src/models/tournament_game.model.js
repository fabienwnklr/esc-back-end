module.exports = (sequelize, Sequelize) => {
    const TournamentGame = sequelize.define('tournament_game', {
        game_id: {
            type: Sequelize.INTEGER,
            allNull: false,
            references: {
                // This is a reference to another model
                model: 'game',
                // This is the column name of the referenced model
                key: 'id',
            }
        },
        tournament_id: {
            type: Sequelize.INTEGER,
            allNull: false,
            references: {
                // This is a reference to another model
                model: 'tournament',
                // This is the column name of the referenced model
                key: 'id',

            }
        }
    });

    return TournamentGame;
}