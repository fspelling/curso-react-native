import React from 'react';
import { createBottomTabNavigator } from 'react-navigation'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';

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
        screen: AddPhoto,
        navigationOptions: {
            title: 'Add Picture',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='camera' size={30} color={tintColor} />
            )
        }
    },
    Profiler: {
        name: 'Profiler',
        screen: Profile,
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
