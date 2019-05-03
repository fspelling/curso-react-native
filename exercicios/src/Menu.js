import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import Simples from './componentes/Simples';
import ImparPar from './componentes/ImparPar';
import Inverter, { MegaSena } from './componentes/Multi';
import Contador from './componentes/Contador';
import Plataforma from './componentes/Plataforma';
import ValidarProps from './componentes/ValidarProps';

export default createDrawerNavigator({
    Plataforma: {
        screen: () =>
            <View style={styles.container}>
                <Plataforma />
            </View>
    },
    Simples: {
        screen: () =>
            <View style={styles.container}>
                <Simples texto="App!" />
            </View>
    },
    MegaSenha: {
        screen: () =>
            <View style={styles.container}>
                <MegaSena numeros={4} />
            </View>,
        navigationOptions: { title: 'mega sena' }
    },
    Inverter: {
        screen: () =>
            <View style={styles.container}>
                <Inverter texto="test" />
            </View>
    },
    ParOuImpar: {
        screen: () =>
            <View style={styles.container}>
                <ImparPar numero={22} />
            </View>,
        navigationOptions: { title: 'par ou impar' }
    },
    Contador: {
        screen: () =>
            <View style={styles.container}>
                <Contador numero={22} />
            </View>
    },
    ValidarProps: {
        screen: () =>
            <View style={styles.container}>
                <ValidarProps ano={2000} />
            </View>
    }
}, { drawerWidth: 300 });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    f40: {
        fontSize: 40
    }
});