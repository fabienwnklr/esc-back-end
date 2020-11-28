
module.exports = (sequelize, Sequelize) => {
    const TournamentPlatforms = sequelize.define('Tournament_platforms', {
        tournament_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                // This is a reference to another model
                model: 'tournaments',
                // This is the column name of the referenced model
                key: 'id',

            }
        },
        platform_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'platforms',
                key: 'id',
            }
        }
    });

    return TournamentPlatforms;
}