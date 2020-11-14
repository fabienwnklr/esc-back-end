const db = require('../models');
const { Sequelize } = require('../models');
const Platform = db.platforms;
const { Op } = require('sequelize');

exports.create = (req, res) => {
    const newPlatform = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        createdBy: req.body.createdBy,
    };
    if (!newPlatform.name) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }
    console.log(req.body)
    Platform.create(newPlatform)
        .then(data => {
            res.status(200).send({
                message: 'Jeu créé avec succès !',
                data
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
    Platform.findAll()
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

    Platform.findByPk(id)
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
    console.log(req.body);

    Platform.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.status(200).send({
                   message: 'Modification enregistré',
                   data
                });
            } else {
                res.send({
                    message: `Cannot update Platform with id=${id}. Maybe Platform was not found or req.body is empty!`
                });
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

    Platform.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Platform was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Platform with id=${id}. Maybe Platform was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Platform with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Platform.destroy({
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