import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import Agenda from './screens/Agenda';
import Auth from './screens/Auth';

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: Agenda
    }
};

const mainNavigator = createSwitchNavigator(mainRoutes, { initialRouteName: 'Auth' });

export default mainNavigator;