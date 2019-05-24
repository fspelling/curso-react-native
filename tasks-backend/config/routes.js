module.exports = (app) => {
    app.post('/signup', app.api.user.save);
    app.post('/signin', app.api.auth.signin);

    app.route('/tasks').all(app.config.passport.autenticate())
        .get(app.api.task.getTasks)
        .post(app.api.task.saveTask);

    app.route('/tasks/:id').all(app.config.passport.autenticate())
        .delete(app.api.task.removeTask);

    app.route('/tasks/:id/toggle').all(app.config.passport.autenticate())
        .put(app.api.task.toggleTask);
}