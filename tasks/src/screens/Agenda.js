import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Platform, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import commomStyles from '../commomStyles';
import Task from '../componentes/Task';
import Icon from 'react-native-vector-icons/FontAwesome';
import Action from 'react-native-action-button';
import NewTask from './NewTask';

export default class Agenda extends React.Component {
    state = {
        tasks: [],
        visibleTasks: [],
        showDoneTasks: true,
        showModal: false
    };

    filterTasks = () => {
        let visibleTasks = null;

        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks];
        } else {
            const pending = (task) => task.doneAt === null;
            visibleTasks = this.state.tasks.filter(pending);
        }

        this.setState({ visibleTasks });
        AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
    }

    deleteTask = (id) => {
        const tasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({ tasks }, this.filterTasks);
    }

    addTask = (task) => {
        const tasks = [...this.state.tasks];
        tasks.push({
            id: Math.random(),
            desc: task.desc,
            estimateAt: task.date,
            doneAt: null
        });

        this.setState({ tasks, showModal: false }, this.filterTasks);
    }

    componentDidMount = async () => {
        const data = await AsyncStorage.getItem('tasks');
        const tasks = JSON.parse(data) || [];

        this.setState({ tasks }, this.filterTasks);
    }

    togleTaskCheck = (id) => {
        const tasks = this.state.tasks.map((item) => {
            if (item.id === id) item.doneAt = item.doneAt ? null : new Date();
            return item;
        });

        this.setState({ tasks }, this.filterTasks);
    }

    render() {
        return (
            <View style={styles.container}>
                <NewTask isVisible={this.state.showModal} onSave={this.addTask}
                    onCancel={() => this.setState({ showModal: false })} />
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commomStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subTitle}>{moment().locale('pt-br').format('ddd, D [de] MMMM YYYY')}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <FlatList data={this.state.visibleTasks} keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Task {...item} togleTaskCheck={this.togleTaskCheck} onDelete={this.deleteTask} />} />
                </View>
                <Action buttonColor={commomStyles.colors.today}
                    onPress={() => this.setState({ showModal: true })} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    tasksContainer: {
        flex: 7
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});