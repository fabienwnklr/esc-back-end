const authMiddleware = require('../middleware/authJwt.js');

module.exports = app => {
    const platform = require('../controllers/platform.controller');
    const router = require('express').Router();

    router.post('/create', authMiddleware.verifyToken ,platform.create);

    router.get('/', platform.findAll);

    router.get('/:id', platform.findOne);

    router.put('/:id', platform.update);

    router.delete('/:id', platform.delete);

    app.use('/api/platform', router);
}