const db = require('../models');
const Tournament = db.tournaments;
const Op = db.Sequelize.Op;

exports.register = (req, res) => {
   if (!req.body.username || !req.body.email || !req.body.password) {
       res.status(400).json({
           message: 'Veuillez remplir tous les champs.'
       });
       return;
   }
}