module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
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
        createdBy: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()'),
            allowNull: true
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

    return User;
}