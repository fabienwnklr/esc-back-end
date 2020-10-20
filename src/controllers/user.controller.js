const db = require('../models');
const { Sequelize } = require('../models');
const User = db.users;
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        password: bcrypt.hashSync(req.body.password, 15)
    };

    User.create(newUser)
        .then(data => {
            this.login(req, res);
        })
        .catch(error => {
            res.status(500).send({
                errorThrow: error,
                message: `Une erreur est survenue lors de la création de l'utilisateur.`
            });
        });
}

exports.login = (req, res) => {
    const email = req.body.email;
    const pwd = req.body.password;
    if (!email || !pwd) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }

    User.findOne({ where: { email: email } })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: 'Utilisateur introuvable'
                });
                return;
            }
            const userFind = data.dataValues;
            if (bcrypt.compareSync(pwd, userFind.password)) {
                const userLogged = {
                    id: userFind.id,
                    username: userFind.username,
                    email: userFind.email,
                    is_admin: userFind.is_admin
                }
                jwt.sign({ user: userLogged }, 'secretkey', { expiresIn: '5min' }, (err, token) => {
                    if (err) res.json(err)
                    res.send({ auth: true, token: token, user: userLogged }).status(200)
                })
            } else {
                res.status(403).send({
                    message: 'Mot de passe incorrect'
                })
            }
        })
        .catch(err =>
            res.status(500).send({
                errorThrow: err.message,
                message: 'Erreur de connexion.'
            })
        )
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