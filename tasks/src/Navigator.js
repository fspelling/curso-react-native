import React from 'react';
import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import Agenda from './screens/Agenda';
import Auth from './screens/Auth';
import commomStyles from './commomStyles';
import Menu from './screens/Menu';

const menuRoutes = {
    Today: {
        name: 'Hoje',
        screen: (props) => <Agenda title='Hoje' daysAhead={0} {...props} />,
        navigationOption: { title: 'Hoje' }
    },
    Tomorow: {
        name: 'Amanha',
        screen: (props) => <Agenda title='Amanha' daysAhead={1} {...props} />,
        navigationOption: { title: 'Amanha' }
    },
    Week: {
        name: 'Semana',
        screen: (props) => <Agenda title='Semana' daysAhead={7} {...props} />,
        navigationOption: { title: 'Semana' }
    },
    Month: {
        name: 'Mes',
        screen: (props) => <Agenda title='Mes' daysAhead={30} {...props} />,
        navigationOption: { title: 'Mes' }
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
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: menuNavigator
    }
};

const mainNavigator = createSwitchNavigator(mainRoutes, { initialRouteName: 'Auth' });

export default mainNavigator;