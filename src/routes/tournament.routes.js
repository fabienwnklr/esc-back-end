const authMiddleware = require('../middleware/authJwt.js');

module.exports = app => {
    const tournament = require('../controllers/tournament.controller');
    const router = require('express').Router();

    router.post('/create', authMiddleware.verifyToken, tournament.create);

    router.post('/addUser', authMiddleware.verifyToken, tournament.addUser);

    router.get('/', tournament.findAll);

    router.get('/:id', tournament.findOne);

    router.put('/:id', authMiddleware.verifyToken, tournament.update);

    router.delete('/:id', authMiddleware.verifyToken, tournament.delete);

    app.use('/api/tournament', router);
}