import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class AuthOrApp extends React.Component {
    componentWillUnmount = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const userJson = JSON.parse(userData) || {};

        if (userJson.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userJson.token}`;
            this.props.navigate('Home', userJson);
        } else {
            this.props.navigate('Auth');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    }
});
