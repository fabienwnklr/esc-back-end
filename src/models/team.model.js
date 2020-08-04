module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define('Teams', {
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        admin: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
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

    return Team;
}