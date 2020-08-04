module.exports = (sequelize, Sequelize) => {
    const GameTournament = sequelize.define('Game_tournaments', {
        game_id: {
            type: Sequelize.INTEGER,
            allNull: false,
            references: {
                // This is a reference to another model
                model: 'games',
                // This is the column name of the referenced model
                key: 'id',
            }
        },
        tournament_id: {
            type: Sequelize.INTEGER,
            allNull: false,
            references: {
                // This is a reference to another model
                model: 'tournaments',
                // This is the column name of the referenced model
                key: 'id',

            }
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()'),
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()'),
            allowNull: false
        }
    });

    return GameTournament;
}