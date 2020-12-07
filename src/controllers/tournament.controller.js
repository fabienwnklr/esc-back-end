const db = require('../models');
const User = db.user;
const Tournament = db.tournament;
const Game = db.game;
const Platform = db.platform;
const { Op } = require('sequelize');

exports.create = async (req, res) => {
    const newTournament = {
        name: req.body.name,
        start_date: req.body.start_date,
        createdBy: req.body.createdBy,
        // nb_participants: req.body.nb_participants,
        // user: {
        //     id: req.body.user_id
        // },
        // game: {
        //     id: req.body.game
        // },
        // platform: {
        //     id: req.body.platform
        // }
    };
    if (!newTournament.name || !newTournament.start_date || !newTournament.createdBy) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }
    const tournamentCreated = await Tournament.create(newTournament);
    const game = await Game.findByPk(req.body.game);
    await tournamentCreated.addGame(game);

    const result = await Tournament.findOne({
        where: {id: tournamentCreated.dataValues.id},
        include: 'games'
    })

    res.status(200).send({
        message: 'Tournament created successfully !',
        result
    });
};

exports.findAll = (req, res) => {
    Tournament.findAll({include: 'games'})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Erreur lors de la récupération des tournois.'
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tournament.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Erreur de récupération du tournoi pour id = ${id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tournament.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Tournament was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Tournament with id=${id}. Maybe Tournament was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tournament with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tournament.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tournament was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tournament with id=${id}. Maybe Tournament was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tournament with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Tournament.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

exports.findAllActive = (req, res) => {
    Tutorial.findAll({
        where: {
            start_date: {
                [Op.gte]: db.Sequelize.literal('NOW()')
            }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};