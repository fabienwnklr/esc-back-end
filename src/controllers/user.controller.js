const db = require('../models');
const { Sequelize } = require('../models');
const User = db.users;
const { Op } = require('sequelize');

exports.register = (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    User.create(newUser)
        .then(data => {
            console.log(req); return;
            User.login(req);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || `Une erreur est survenue lors de la création de l'utilisateur.`
            });
        });
}

exports.login = (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Tournament with id= ${id}`
            });
        });
}