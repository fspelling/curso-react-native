import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Platform, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import tomorrowImage from '../../assets/imgs/tomorrow.jpg';
import weekImage from '../../assets/imgs/week.jpg';
import monthImage from '../../assets/imgs/month.jpg';
import commomStyles from '../commomStyles';
import Task from '../componentes/Task';
import Icon from 'react-native-vector-icons/FontAwesome';
import Action from 'react-native-action-button';
import NewTask from './NewTask';
import { showError } from '../commom';
import StorageTasks from '../storage/StorageTasks';
import AsyncStorage from '@react-native-community/async-storage';

export default class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.storageTasks = new StorageTasks();
    }

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
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
    }

    deleteTask = async (id) => {
        try {
            await this.storageTasks.delete(id);
            this.setState({ showModal: false }, this.loadTasks);
        } catch (erro) {
            showError(erro);
        }
    }

    addTask = async (task) => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const userJson = JSON.parse(userData) || {};

            await this.storageTasks.post(task, userJson.userId);
            this.setState({ showModal: false }, this.loadTasks);
        } catch (erro) {
            showError(erro);
        }
    }

    componentDidMount = async () => {
        this.loadTasks();
    }

    togleTaskCheck = async (id) => {
        try {
            await this.storageTasks.put(id);
            await this.loadTasks();
        } catch (erro) {
            showError(erro);
        }
    }

    loadTasks = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const userJson = JSON.parse(userData) || {};

            const maxDate = moment().add(this.props.daysAhead, 'days').format('YYYY-MM-DD 23:59');
            const res = await this.storageTasks.get(maxDate, userJson.userId);

            this.setState({ tasks: res }, this.filterTasks);
        } catch (erro) {
            showError(erro);
        }
    }

    render() {
        let backgroundImage = undefined;
        let styleColor = undefined;

        switch (this.props.daysAhead) {
            case 0:
                backgroundImage = todayImage;
                styleColor = commomStyles.colors.today;
                break;
            case 1:
                backgroundImage = tomorrowImage;
                styleColor = commomStyles.colors.tomorrow;
                break;
            case 7:
                backgroundImage = weekImage;
                styleColor = commomStyles.colors.week;
                break;
            case 30:
                backgroundImage = monthImage;
                styleColor = commomStyles.colors.month;
                break;
        }

        return (
            <View style={styles.container}>
                <NewTask isVisible={this.state.showModal} onSave={this.addTask}
                    onCancel={() => this.setState({ showModal: false })} />
                <ImageBackground source={backgroundImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={20} color={commomStyles.colors.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commomStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subTitle}>{moment().locale('pt-br').format('ddd, D [de] MMMM YYYY')}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <FlatList data={this.state.visibleTasks} keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Task {...item} togleTaskCheck={this.togleTaskCheck} onDelete={this.deleteTask} />} />
                </View>
                <Action buttonColor={styleColor} onPress={() => this.setState({ showModal: true })} />
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
        justifyContent: 'space-between',
    }
});
