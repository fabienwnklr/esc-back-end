const authMiddleware = require('../middleware/authJwt.js');

module.exports = app => {
    const game = require('../controllers/game.controller');
    const router = require('express').Router();

    router.post('/create', authMiddleware.verifyToken ,game.create);

    router.get('/', game.findAll);

    router.get('/:id', game.findOne);

    router.put('/:id', authMiddleware.verifyToken, game.update);

    router.delete('/:id', authMiddleware.verifyToken, game.delete);

    app.use('/api/game', router);
}