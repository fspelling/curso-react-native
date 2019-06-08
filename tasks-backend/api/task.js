const moment = require('moment');

module.exports = (app) => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date : moment().endOf('day').toDate();

        app.db('tasks').where({ userId: req.user.id }).where('estimateAt', '<=', date).orderBy('estimateAt')
            .then(tasks => res.json(tasks))
            .catch(erro => res.status(500).json(erro));
    }

    const saveTask = (req, res) => {
        if (!req.body.desc.trim())
            return res.status(400).send('Descricao é um campo obrigatorio');

        req.body.userId = req.user.id;

        app.db('tasks').insert(req.body)
            .then(_ => res.status(204).send())
            .catch(erro => res.status(500).json(erro));
    }

    const saveTaskLote = (req, res) => {
        const listTask = req.body.tasks || [];

        if (listTask.length === 0)
            return res.status(400).send('Lista de task vazia');

        listTask.forEach(async task => {
            try {
                await app.db('tasks').where({ id: task.id, userId: task.userId }).del()
                await app.db('tasks').insert(task);
                
                res.status(204).send();
            } catch (erro) {
                res.status(500).json(erro);
            }
        });
    }

    const removeTask = (req, res) => {
        app.db('tasks').where({ id: req.params.id, userId: req.user.id }).del()
            .then(rowDeleted => {
                if (rowDeleted > 0)
                    res.status(204).send();
                else
                    res.status(400).send(`Nao foi possivel encontrar a task: ${req.params.id}`)
            })
            .catch(erro => res.status(500).json(erro));
    }

    const updateTaskDoneAt = (req, res, doneAt) => {
        app.db('tasks').where({ id: req.params.id, userId: req.user.id }).update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(erro => res.status(500).json(erro));
    }

    const toggleTask = (req, res) => {
        app.db('tasks').where({ id: req.params.id, userId: req.user.id }).first()
            .then(task => {
                if (!task)
                    res.status(400).send(`task ${req.params.id} nao encontrado`);

                const doneAt = task.doneAt ? null : new Date();
                updateTaskDoneAt(req, res, doneAt);
            })
            .catch(erro => res.status(500).json(erro));
    }

    return { getTasks, saveTask, saveTaskLote, removeTask, toggleTask };
}