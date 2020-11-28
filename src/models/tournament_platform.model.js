
module.exports = (sequelize, Sequelize) => {
    const TournamentPlatform = sequelize.define('Tournament_platform', {
        tournament_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                // This is a reference to another model
                model: 'tournament',
                // This is the column name of the referenced model
                key: 'id',

            }
        },
        platform_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'platform',
                key: 'id',
            }
        }
    });

    return TournamentPlatform;
}