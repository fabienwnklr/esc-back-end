const authMiddleware = require('../middleware/authJwt.js');

module.exports = app => {
    const user = require('../controllers/user.controller');
    const router = require('express').Router();

    router.get('/', authMiddleware.verifyToken, user.findAll);

    router.get('/:id', user.findOne);

    router.put('/:id', authMiddleware.verifyToken, user.update);

    router.delete('/:id', authMiddleware.verifyToken, user.delete);

    app.use('/api/user', router);
}