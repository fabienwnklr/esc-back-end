module.exports = (sequelize, Sequelize) => {
    const Tournament = sequelize.define('Tournaments', {
        // Model attributes are defined here
        name: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        start_date: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true
        },
        nb_participant: {
            type: Sequelize.INTEGER(3),
            allowNull: false
        },
        author: {
            type: Sequelize.STRING(255),
            allowNull: false
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

    return Tournament;
}