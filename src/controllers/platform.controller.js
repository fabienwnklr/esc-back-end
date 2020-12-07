const db = require('../models');
const { Sequelize } = require('../models');
const Platform = db.platform;
const { Op } = require('sequelize');

exports.create = (req, res) => {
    const newPlatform = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        createdBy: req.body.createdBy,
    };
    if (!newPlatform.name) {
        res.status(400).json({
            message: 'Please fill in all the fields'
        });
        return;
    }

    Platform.create(newPlatform)
        .then(data => {
            Platform.findByPk(data.id).then(platformAdded => {
                res.status(200).send({
                    message: 'Platform created successfully',
                    values: platformAdded.dataValues
                });
            });
        })
        .catch(error => {
            res.status(500).send({
                errorThrow: error,
                message: 'An error occured durgin Platform creation'
            });
        });
};

exports.findAll = (req, res) => {
    Platform.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                errorThrow: error,
                message: 'An error occured durgin retrieving platform\'s data'
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
            res.status(401).send({
                errorThrow: err,
                message: `An error occured when retrieving platform data for id = ${id}`
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
                    message: 'Saved change(s)'
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                errorThrow: error,
                message: `An error occured during the modification(s)`
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
                    message: 'Platform removed'
                });
            } else {
                res.send({
                    message: `Could not delete Platform with id = ${id}, maybe already removed`
                });
            }
        })
        .catch(error => {
            res.status(401).send({
                errorThrow: error,
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
            res.send({ message: `${nums} Platforms were deleted successfully` });
        })
        .catch(error => {
            res.status(401).send({
                errorThrow: error,
                message: "Some error occurred while removing all Platforms."
            });
        });
};