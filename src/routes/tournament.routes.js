module.exports = app => {
    const tournaments = require('../controllers/tournament.controller');
    const router = require('express').Router();

    router.post('/create', tournaments.create);

    router.get('/tournaments', tournaments.getAll);
    // router.put('/:id', users.update);

    app.use('/api/tournament', router);
}