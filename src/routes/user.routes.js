const authMiddleware = require('../middleware/authJwt.js');

module.exports = app => {
    const user = require('../controllers/user.controller');
    const router = require('express').Router();

    router.get('/', user.findAll);

    router.get('/:id', user.findOne);

    router.put('/:id', user.update);

    router.delete('/:id', user.delete);

    app.use('/api/user', router);
}