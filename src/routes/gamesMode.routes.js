const authMiddleware = require('../middleware/authJwt.js');

module.exports = app => {
    const gamesMode = require('../controllers/gamesMode.controller');
    const router = require('express').Router();

    router.post('/create', authMiddleware.verifyToken, gamesMode.create);

    router.get('/', gamesMode.findAll);

    router.get('/:id', gamesMode.findOne);

    router.put('/:id', authMiddleware.verifyToken, gamesMode.update);

    router.delete('/:id', authMiddleware.verifyToken, gamesMode.delete);

    app.use('/api/gamesMode', router);
}