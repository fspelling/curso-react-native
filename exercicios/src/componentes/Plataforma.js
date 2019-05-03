import React from 'react';
import { Button, Alert, ToastAndroid, Platform } from 'react-native';

export default () => {
    const notificar = (msg) => {
        if (Platform.OS == 'android')
            ToastAndroid.show(`${msg} - android`, ToastAndroid.LONG);
        else
            Alert.alert('info', `${msg} - ios`);
    };

    return (
        <Button title="plataforma" onPress={() => notificar('plataforma')}/>
    );
};