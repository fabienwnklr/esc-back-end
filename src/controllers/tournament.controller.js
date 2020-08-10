const db = require('../models');
const { Sequelize } = require('../models');
const Tournament = db.tournaments;
const { Op } = require('sequelize');

exports.create = (req, res) => {
    console.log(req);
    if (!req.body || req.body.length < 4) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }

    const newTournament = {
        name: req.body.name,
        start_date: req.body.start_date,
        nb_participants: req.body.nb_participants,
        user: {
            id: req.params.user_id
        },
        game: {
            id: req.body.game
        },
        platform: {
            id: req.body.platform
        }
    };

    Tournament.create(newTournament)
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || 'Une erreur est survenue lors de la création du tournoi.'
            });
        });
};

exports.findAll = (req, res) => {
    Tournament.findAll()
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
                message: `Error retrieving Tournament with id= ${id}`
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
                [Op.gte]: Sequelize.literal('NOW()')
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