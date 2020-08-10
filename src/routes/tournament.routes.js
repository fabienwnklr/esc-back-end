module.exports = app => {
    const tournaments = require('../controllers/tournament.controller');
    const router = require('express').Router();

    router.post('/create', tournaments.create);

    router.get('/', tournaments.findAll);

    router.get('/:id', tournaments.findOne);

    router.put('/:id', tournaments.update);

    router.delete('/:id', tournaments.delete);

    app.use('/api/tournaments', router);
}