module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('Users', {
        // Model attributes are defined here
        username: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        team_id: {
            type: Sequelize.INTEGER(11),
            unique: true
        }
    });

    return User;
}