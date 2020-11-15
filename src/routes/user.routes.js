const authMiddleware = require('../middleware/authJwt.js');

module.exports = app => {
    const users = require('../controllers/user.controller');
    const router = require('express').Router();

    router.get('/', users.findAll);

    router.get('/:id', users.findOne);

    router.put('/:id', users.update);

    router.delete('/:id', users.delete);

    app.use('/api/users', router);
}