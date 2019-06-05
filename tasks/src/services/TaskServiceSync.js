import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { server } from '../commom';

export default class TaskServiceSync {
    constructor(timer = 6000, sync = true) {
        this.timeout = timer;
        this.sync = sync;
        this.exec = undefined;
    }

    init = async () => {
        console.debug('---EXEC SYNC---');
        if (this.sync && !this.exec)
            this.exec = setInterval(await this.insertLote, this.timeout);
        else if (!this.sync)
            await this.insertLote();
    }

    insertLote = async () => {
        const tasksData = await AsyncStorage.getItem('tasks');

        if (tasksData) {
            let tasksList = JSON.parse(tasksData) || [];
            //await axios.post(`${server}/tasks/lote`, { data: tasksList });
            console.debug('---SYNC---');
        }
    }
}