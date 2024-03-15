module.exports = (app) => {
    require('./user')(app)
    require('./article')(app)
    require('./auth')(app)
}