import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { server } from '../commom';

export default class TaskServiceSync extends React.Component {
    state = {
        sync: true,
        timeout: 6000
    };

    constructor(props) {
        super(props);
        this.exec = undefined;

        if(props.sync) this.setState({ sync: props.sync });
        if(props.timeout) this.setState({ timeout: props.timeout });
    }

    init = async () => {
        if (this.sync && !this.exec)
            this.exec = setInterval(await this.insertLote, this.timeout);
        else if (!this.sync)
            await this.insertLote();
    }

    insertLote = async () => {
        this.props.showLoading();
        const tasksData = await AsyncStorage.getItem('tasks');

        if (tasksData) {
            let tasksList = JSON.parse(tasksData) || [];
            await axios.post(`${server}/tasks/lote`, { data: tasksList });
        }

        this.props.hideLoading();
    }

    render() {
        await this.init();
        return;
    }
}