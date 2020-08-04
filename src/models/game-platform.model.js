module.exports = (sequelize, Sequelize) => {
    const GamePlatform = sequelize.define('Game_platforms', {
        game_id: {
            type: Sequelize.INTEGER,
            allNull: false,
            references: {
                // This is a reference to another model
                model: 'games',
                // This is the column name of the referenced model
                key: 'id',
            }
        },
        platform_id: {
            type: Sequelize.INTEGER,
            allNull: false,
            references: {
                // This is a reference to another model
                model: 'platforms',
                // This is the column name of the referenced model
                key: 'id',
            }
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

    return GamePlatform;
}