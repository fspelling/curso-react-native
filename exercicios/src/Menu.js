import React from 'react';
import { createDrawerNavigator } from 'react-navigation'
import Simples from './componentes/Simples';
import ImparPar from './componentes/ImparPar';
import Inverter, { MegaSena } from './componentes/Multi';

export default createDrawerNavigator({
    Simples: {
        screen: () => <Simples texto="App!" />
    },
    MegaSenha: {
        screen: () => <MegaSena numeros={4} />,
        navigationOptions: { title: 'mega sena' }
    },
    Inverter: {
        screen: () => <Inverter texto="test" />
    },
    ParOuImpar: {
        screen: () => <ImparPar numero={22} />,
        navigationOptions: { title: 'par ou impar' }
    }
}, { drawerWidth: 300 });