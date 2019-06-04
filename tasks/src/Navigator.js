import React from 'react';
import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import Agenda from './screens/Agenda';
import Auth from './screens/Auth';
import commomStyles from './commomStyles';
import Menu from './screens/Menu';
import AuthOrApp from './screens/AuthOrApp';

const menuRoutes = {
    Today: {
        name: 'Today',
        screen: (props) => <Agenda title='Hoje' daysAhead={0} {...props} />,
        navigationOptions: { title: 'Hoje' }
    },
    Tomorow: {
        name: 'Tomorow',
        screen: (props) => <Agenda title='Amanha' daysAhead={1} {...props} />,
        navigationOptions: { title: 'Amanha' }
    },
    Week: {
        name: 'Week',
        screen: (props) => <Agenda title='Semana' daysAhead={7} {...props} />,
        navigationOptions: { title: 'Semana' }
    },
    Month: {
        name: 'Month',
        screen: (props) => <Agenda title='Mes' daysAhead={30} {...props} />,
        navigationOptions: { title: 'Mes' }
    }
};

menuConfig = {
    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily: commomStyles.fontFamily,
            fontWeight: 'bold',
            fontSize: 20
        },
        activeLabelStyle: {
            color: '#080'
        }
    }
};

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig);

const mainRoutes = {
    AuthOrApp: {
        name: 'AuthOrApp',
        screen: AuthOrApp
    },
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: menuNavigator
    }
};

const mainNavigator = createSwitchNavigator(mainRoutes, { initialRouteName: 'AuthOrApp' });

export default mainNavigator;
