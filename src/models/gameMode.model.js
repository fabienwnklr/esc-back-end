module.exports = (sequelize, Sequelize) => {
    const GameMode = sequelize.define('game_mode', {
        // Model attributes are defined here
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true
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
            allowNull: true
        }
    }, { freezeTableName: true });

    return GameMode;
}