const authMiddleware = require('../middleware/authJwt.js');

module.exports = app => {
    const games = require('../controllers/platform.controller');
    const router = require('express').Router();

    router.post('/create', authMiddleware.verifyToken ,games.create);

    router.get('/', games.findAll);

    router.get('/:id', games.findOne);

    router.put('/:id', games.update);

    router.delete('/:id', games.delete);

    app.use('/api/platforms', router);
}