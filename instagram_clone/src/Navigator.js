import React from 'react';
import { createBottomTabNavigator } from 'react-navigation'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './src/screens/Feed';

const MenuRoutes = {
    Feed: {
        name: 'Feed',
        screen: Feed,
        navigationOptions: {
            title: 'Feed',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='home' size={30} color={tintColor} />
            )
        }
    },
    Add: {
        name: 'Add',
        screen: Feed,
        navigationOptions: {
            title: 'Add Picture',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='camera' size={30} color={tintColor} />
            )
        }
    },
    Profiler: {
        name: 'Profiler',
        screen: Feed,
        navigationOptions: {
            title: 'Profiler',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='user' size={30} color={tintColor} />
            )
        }
    }
};

const MenuConfig = {
    initialRouteName: 'Feed',
    tabBarOptions: {
        showLabel: false
    }
};

export default createBottomTabNavigator(MenuRoutes, MenuConfig);
