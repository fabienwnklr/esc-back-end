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
        nb_participant: req.body.nb_participant,
        game_mode: req.body.game_mode,
        platform: req.body.platforms,
        game: req.body.game
    };
    if (!newTournament.name || !newTournament.start_date || !newTournament.createdBy) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }
    const tournamentCreated = await Tournament.create(newTournament);
    const game = await Game.findByPk(req.body.game);
    const creator = await User.findByPk(req.body.authorId)
    const platforms = await Platform.findAll({
        where: {
            id: req.body.platforms
        }
    });

    await tournamentCreated.addGame(game);
    await tournamentCreated.addPlatforms(platforms);
    await tournamentCreated.addUsers(creator);

    const result = await Tournament.findOne({
        where: { id: tournamentCreated.dataValues.id },
        include: [
            {
                model: Game, as: 'games', attributes: ['name']
            },
            {
                model: Platform, as: 'platforms', attributes: ['name']
            },
            {
                model: User, as: 'users', attributes: ['username']
            }
        ],
    })

    res.status(200).send({
        message: 'Tournament created successfully !',
        result
    });
};

exports.findAll = (req, res) => {
    Tournament.findAll({
        include: [
            {
                model: Game, as: 'games', attributes: ['name']
            },
            {
                model: Platform, as: 'platforms', attributes: ['name']
            },
            {
                model: User, as: 'users', attributes: ['username']
            }
        ],
        order: [['createdAt', 'DESC']]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Erreur lors de la récupération des tournois.'
            });
        });
};

exports.findOne = async (req, res) => {
    const id = req.params.id;

    Tournament.findByPk(id, {
        include: [
            {
                model: Game, as: 'games', attributes: ['name']
            },
            {
                model: Platform, as: 'platforms', attributes: ['name']
            },
            {
                model: User, as: 'users', attributes: ['username']
            }
        ],
    })
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
            res.send({ message: `${nums} tournaments were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tournaments."
            });
        });
};

exports.findAllActive = (req, res) => {
    Tournament.findAll({
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
                    err.message || "Some error occurred while retrieving tournament."
            });
        });
};

exports.addUser = async (req, res) => {
    try {
        if (!req.body.tournament || !req.body.user) {
            res.status(300).send({
                message: 'Missing data.'
            });
            return;
        }
        const id_tournament = req.body.tournament;
        const id_user = req.body.user;
        // Get tournament targeted
        const tournament = await Tournament.findByPk(id_tournament, {
            include: [
                {
                    model: Game, as: 'games', attributes: ['name']
                },
                {
                    model: Platform, as: 'platforms', attributes: ['name']
                },
                {
                    model: User, as: 'users', attributes: ['username']
                }
            ],
        })
        // Then the user
        const user = await User.findByPk(id_user)
        // And add user to tournament
        const userAdded = await tournament.addUser(user);

        if (userAdded) {
            res.status(200).send({
                message: 'You have joined tournament ! Congrat\' !'
            })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message || 'Error when add user to this tournament'
        })
    }
}