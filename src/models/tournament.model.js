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
            unique: true,
        },
        end_date: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
    });

    return Tournament;
}