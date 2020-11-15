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

    Platform.create(newPlatform)
        .then(data => {
            Platform.findByPk(data.id).then(platformAdded => {
                res.status(200).send({
                    message: 'Plateforme créée avec succès !',
                    values: platformAdded.dataValues
                });
            });
        })
        .catch(error => {
            res.status(500).send({
                errorThrow: error,
                message: 'Une erreur est survenue lors de la création de la plateforme.'
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
                message: 'Erreur lors de la récupération des plateformes.'
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
                message: `Erreur de récupération de la plateforme pour id = ${id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const values = req.body;

    Platform.update(values, {
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

    Platform.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: 'Supression enregistrée'
                });
            } else {
                res.send({
                    message: `Impossible de supprimer la plateforme pour id = ${id}`
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