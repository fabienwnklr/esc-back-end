module.exports = (sequelize, Sequelize) => {
    const GamePlatform = sequelize.define('Game_platform', {
        game_id: {
            type: Sequelize.INTEGER,
            allNull: false,
            references: {
                // This is a reference to another model
                model: 'game',
                // This is the column name of the referenced model
                key: 'id',
            }
        },
        platform_id: {
            type: Sequelize.INTEGER,
            allNull: false,
            references: {
                // This is a reference to another model
                model: 'platform',
                // This is the column name of the referenced model
                key: 'id',
            }
        }
    }, { freezeTableName: true });

    return GamePlatform;
}