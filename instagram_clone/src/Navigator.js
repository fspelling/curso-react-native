import React from 'react';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';
import Splash from './screens/Splash';

const authRouter = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: { title: 'Login' }
    },
    Register: {
        screen: Register,
        navigationOptions: { title: 'Register' }
    }
}, { initialRouteName: 'Login' });

const loginOrProfileRouter = createSwitchNavigator({
    Auth: authRouter,
    Profile: Profile
}, { initialRouteName: 'Auth' });

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
        screen: loginOrProfileRouter,
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

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig);

const SplashRouter = createSwitchNavigator({
    Splash: Splash,
    App: MenuNavigator
}, {
    initialRouteName: 'Splash'
});

export default SplashRouter;