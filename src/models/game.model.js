module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define('Game', {
        // Model attributes are defined here
        name: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        imgUrl: {
            type: Sequelize.STRING(255),
            allowNull: true
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

    return Game;
}