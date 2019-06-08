module.exports = (app) => {
    app.post('/signup', app.api.user.save);
    app.post('/signin', app.api.auth.signin);

    app.route('/tasks')
        .get(app.api.task.getTasks)
        .post(app.api.task.saveTask);

    app.route('/tasks/:id')
        .delete(app.api.task.removeTask);

    app.route('/tasks/:id/toggle')
        .put(app.api.task.toggleTask);

    app.route('/tasks/lote')
        .post(app.api.task.saveTaskLote);
}
