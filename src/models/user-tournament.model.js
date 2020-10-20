module.exports = (sequelize, Sequelize) => {
    const UserTournament = sequelize.define('User_tournaments', {
        // Model attributes are defined here
        user_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        tournament_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'tournaments',
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

    return UserTournament;
}