const db = require('../models');
const User = db.user;
const Game = db.game;
const GameMode = db.gameMode;
const Platform = db.platform;
const { Op } = require('sequelize');

exports.create = async (req, res) => {
    const newGameMode = {
        name: req.body.name,
        createdBy: 'Fab'
    };

    try {
        const gameModeCreated = await GameMode.create(newGameMode);
        const games = await Game.findAll({
            where: {
                id: req.body.games
            }
        });

        await gameModeCreated.addGames(games);
        // await Game.addGameModes(gameModeCreated);

        const result = await GameMode.findOne({
            where: { id: gameModeCreated.dataValues.id },
            include: [
                {
                    model: Game, as: 'games', attributes: ['name']
                }
            ],
        });

        res.status(200).send({
            message: 'Game mode created successfully !',
            result
        });
    } catch (error) {
        if (error instanceof db.Sequelize.UniqueConstraintError) {
            return res.send({
                errorThrow: error,
                message: 'This game mode already exist.'
            })
        }
        console.error(error)
    }
};

exports.findAll = (req, res) => {
    GameMode.findAll({
        include: [
            {
                model: Game, as: 'games', attributes: ['name', 'id']
            }
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Erreur lors de la récupération des modes de jeu.'
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    GameMode.findByPk(id, {
        include: [
            {
                model: Game, as: 'games', attributes: ['name', 'id']
            }
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                errorThrow: err,
                message: `Erreur de récupération du mode de jeu pour id = ${id}`
            });
        });
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const games = req.body.games;

    let gamesObj = [];
    for (let i = 0; i < games.length; i++) {
        const game = await Game.findByPk(games[i]);
        gamesObj.push(game);
    }

    const mode = await GameMode.findByPk(id);

    mode.setGames(gamesObj, {
        where: { id }
    })
        .then(num => {
            console.log('num' + num)
                res.send({
                    message: 'GameMode was updated successfully.',
                    games: gamesObj
                });
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating GameMode with id=${id}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    GameMode.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "GameMode was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete GameMode with id=${id}. Maybe GameMode was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete GameMode with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    GameMode.destroy({
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