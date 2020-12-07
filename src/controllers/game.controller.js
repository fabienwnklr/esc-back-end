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
            message: 'Please fill in all the fields'
        });
        return;
    }

    Game.create(newGame)
        .then(data => {
            Game.findByPk(data.id).then(gameAdded => {
                res.status(200).send({
                    message: 'Game created successfully',
                    values: gameAdded.dataValues
                });
            });
        })
        .catch(error => {
            res.status(500).send({
                errorThrow: error,
                message: 'An error occured during creation'
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
                message: 'An error occured during retrieving data'
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
                message: `An error occured when retrieving game data for id = ${id}`
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
                    message: 'Saved change(s)'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                errorThrow: err,
                message: `An error occured during the modification(s)`
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
                    message: 'Game removed'
                });
            } else {
                res.send({
                    message: `Could not delete Game with id = ${id}, maybe already removed`
                });
            }
        })
        .catch(err => {
            res.status(401).send({
                errorThrow: err,
                message: `Could not delete Game with id = ${id}`
            });
        });
};

exports.deleteAll = (req, res) => {
    Game.destroy({
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(401).send({
                errorThrow: err,
                message: "Some error occurred while removing all tutorials."
            });
        });
};