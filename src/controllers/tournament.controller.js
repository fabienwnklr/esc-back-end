const db = require('../models');
const Tournament = db.tournaments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req);
    if (!req.body || req.body.length < 4) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }

    const tournament = {
        name: req.body.name,
        game: req.body.game,
        start_date: req.body.start_date,
        nb_participants: req.body.nb_participants
    };

    Tournament.create(tournament)
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || 'Une erreur est survenue lors de la création du tournoi.'
            });
        });
}

exports.getAll = (req, res) => {

}