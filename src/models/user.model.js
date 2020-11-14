module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('Users', {
        // Model attributes are defined here
        // firstname: {
        //     type: Sequelize.STRING(255),
        //     allowNull: true
        // },
        // lastname: {
        //     type: Sequelize.STRING(255),
        //     allowNull: true
        // },
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
        is_admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        team_id: {
            type: Sequelize.INTEGER(11),
            unique: true
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

    return User;
}