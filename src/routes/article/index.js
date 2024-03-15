
const articlesController = require('../../controller/article');
const articlesRoutes = require('express').Router()
const { checkIsAuth } = require('../../config/jwtConfig');

module.exports = (app) => {
    articlesRoutes.get('/articles/', articlesController.getAll)
    articlesRoutes.post('/articles/create/', checkIsAuth, articlesController.create)
    articlesRoutes.put('/articles/update/:uuid', checkIsAuth, articlesController.update)
    articlesRoutes.delete('/articles/delete/:uuid', checkIsAuth, articlesController.delete)
    articlesRoutes.get('/articles/:uuid', checkIsAuth, articlesController.getById)

    app.use('/api/v1/', articlesRoutes);
}