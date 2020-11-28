module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define('Team', {
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        adminId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
            allowNull: false
        },
        createdBy: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()'),
            allowNull: false
        },
        updatedBy : {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()'),
            allowNull: true
        }
    }, { freezeTableName: true });

    return Team;
}