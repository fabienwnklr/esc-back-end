const authMiddleware = require('../middleware/authJwt.js');

module.exports = app => {
    const tournament = require('../controllers/tournament.controller');
    const router = require('express').Router();

    router.post('/create', authMiddleware.verifyToken ,tournament.create);

    router.get('/', tournament.findAll);

    router.get('/:id', tournament.findOne);

    router.put('/:id', tournament.update);

    router.delete('/:id', tournament.delete);

    app.use('/api/tournament', router);
}