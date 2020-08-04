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
        game_id: {
            type: Sequelize.INTEGER,
            allNull: false,
            // references: {
            //     // This is a reference to another model
            //     model: 'games',
            //     // This is the column name of the referenced model
            //     key: 'id',

            // }
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