module.exports = app => {
    const games = require('../controllers/game.controller');
    const router = require('express').Router();

    router.get('/', games.findAll);

    router.get('/:id', games.findOne);

    router.put('/:id', games.update);

    router.delete('/:id', games.delete);

    app.use('/api/games', router);
}