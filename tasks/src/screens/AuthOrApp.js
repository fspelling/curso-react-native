import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Loading from '../componentes/Loading';

export default class AuthOrApp extends React.Component {
    componentWillMount  = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const userJson = JSON.parse(userData) || {};

        if (userJson.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userJson.token}`;
            this.props.navigation.navigate('Home', userJson);
        } else {
            this.props.navigation.navigate('Auth');
        }
    }

    render() {
        return (
            <Loading isLoading={true} />
        );
    }
}
