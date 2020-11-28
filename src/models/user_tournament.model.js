module.exports = (sequelize, Sequelize) => {
    const UserTournament = sequelize.define('User_tournament', {
        // Model attributes are defined here
        user_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        tournament_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'tournament',
                key: 'id',
            }
        }
    }, { freezeTableName: true });

    return UserTournament;
}