module.exports = (sequelize, Sequelize) => {
    const UserTournament = sequelize.define('User_tournament', {
        // Model attributes are defined here
        user_id: {
            type: Sequelize.INTEGER(11),
            unique: 'compositeIndex',
            allowNull: false
        },
        tournament_id: {
            type: Sequelize.INTEGER(11),
            unique: 'compositeIndex',
            allowNull: false
        }
    });

    return UserTournament;
}