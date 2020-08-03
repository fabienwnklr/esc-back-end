module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return User;
}