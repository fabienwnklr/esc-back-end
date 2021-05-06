const authMiddleware = require('../middleware/authJwt.js');

module.exports = app => {
    const gameMode = require('../controllers/gameMode.controller');
    const router = require('express').Router();

    router.post('/create', authMiddleware.verifyToken, gameMode.create);

    router.get('/', gameMode.findAll);

    router.get('/:id', gameMode.findOne);

    router.put('/:id', authMiddleware.verifyToken, gameMode.update);

    router.delete('/:id', authMiddleware.verifyToken, gameMode.delete);

    app.use('/api/gameMode', router);
}