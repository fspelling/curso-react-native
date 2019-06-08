import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { server } from '../commom';

export default class TaskServiceSync {
    constructor(sync = true, timeout = 3600000) {
        this.exec;
        this.sync = sync;
        this.timeout = timeout;
    }

    init = async () => {
        if (this.sync && !this.exec)
            this.exec = setInterval(await this.insertLote, this.timeout);
        else if (!this.sync)
            await this.insertLote();
    }

    insertLote = async () => {
        const tasksData = await AsyncStorage.getItem('tasks');

        if (tasksData) {
            const tasksList = JSON.parse(tasksData) || [];
            const tasks = tasksList.map(task => {
                return {
                    id: task.id,
                    desc: task.desc,
                    estimateAt: task.date.substring(0, 10),
                    doneAt: task.doneAt,
                    userId: task.userId
                }
            });

            try {
                await axios.post(`${server}/tasks/lote`, { tasks });
            } catch (erro) {
                console.debug(`ERRO AO EXECUTAR SYNC: ${erro}`);
            }
        }
    }
}
