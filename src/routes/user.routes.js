module.exports = app => {
    const users = require('../controllers/user.controller');
    const router = require('express').Router();

    router.post('/register', users.register);
    // router.put('/:id', users.update);

    app.use('/api/users', router);
}