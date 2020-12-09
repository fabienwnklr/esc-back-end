const db = require('../models');
const { Sequelize } = require('../models');
const User = db.user;
const { Op } = require('sequelize');

exports.findAll = (req, res) => {
    User.findAll({
        attributes: ['username', 'id', 'email']
    })
        .then(data => {
            console.log(data)
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

    User.findByPk(id, {
        attributes: ['username', 'id', 'email']
    })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: 'Utilisateur inexistant.'
                });
                return;
            }
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Erreur de récupération de l'utilisateur pour id = ${id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const values = req.body;

    User.update(values, {
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

    User.destroy({
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
                message: "Could not delete User with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} User ont étaient supprimés !` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};