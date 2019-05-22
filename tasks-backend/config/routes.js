module.exports = (app) => {
    app.post('/sigin', app.api.user.save);
}