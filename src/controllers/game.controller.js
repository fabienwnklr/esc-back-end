const db = require('../models');
const { Sequelize } = require('../models');
const Game = db.game;
const { Op } = require('sequelize');

exports.create = (req, res) => {
    const newGame = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        createdBy: req.body.createdBy,
    };
    if (!newGame.name) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }

    Game.create(newGame)
        .then(data => {
            Game.findByPk(data.id).then(gameAdded => {
                res.status(200).send({
                    message: 'Jeu créé avec succès !',
                    values: gameAdded.dataValues
                });
            });
        })
        .catch(error => {
            res.status(500).send({
                errorThrow: error,
                message: 'Une erreur est survenue lors de la création du jeu.'
            });
        });
};

exports.findAll = (req, res) => {
    Game.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                errorThrow: err.message,
                message: 'Erreur lors de la récupération des jeux.'
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Game.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Erreur de récupération du jeu pour id = ${id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const values = req.body;

    Game.update(values, {
        where: { id: id }
    })
        .then((num) => {
            console.log(num)
            if (num) {
                res.status(200).send({
                    values,
                    message: 'Modification(s) enregistrée(s)'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                errorThrow: err,
                message: `Erreur inconnu lors de la modification`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Game.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: 'Supression enregistrée'
                });
            } else {
                res.send({
                    message: `Impossible de supprimer le jeu pour id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Game with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Game.destroy({
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