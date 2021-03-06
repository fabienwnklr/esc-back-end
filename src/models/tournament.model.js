module.exports = (sequelize, Sequelize) => {
    const Tournament = sequelize.define('Tournament', {
        // Model attributes are defined here
        name: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        start_date: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: false
        },
        game_mode: {
            type: Sequelize.STRING(55),
            allowNull: false,
        },
        nb_participant: {
            type: Sequelize.INTEGER(3),
            defaultValue: 1,
            allowNull: false
        },
        details: {
            type: Sequelize.TEXT,
            allowNull: true,
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
        updatedBy: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()'),
            allowNull: true
        }
    }, { freezeTableName: true });
    
    return Tournament;
}