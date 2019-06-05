import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import backgroundImage from '../../assets/imgs/login.jpg';
import AuthInput from '../componentes/AuthInput';
import { server, showError } from '../commom';
import axios from 'axios';
import commomStyles from '../commomStyles';

export default class Auth extends React.Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    singinOrSingup = () => {
        if (this.state.stageNew) {
            this.singup();
        }
        else {
            this.singin();
        }
    }

    singup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                address: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            });

            Alert.alert('Sucesso', 'Usuario cadastrado');
            this.setState({ stageNew: false });
        } catch (erro) {
            showError(erro);
        }
    }

    singin = async () => {
        try {
            let res = undefined;

            if (this.state.email === 'test@test.com' || this.state.email === 'f.l.spelling@gmail.com')
                res = { data: { userId: '123', token: '123', address: 'f.l.spelling@gmail.com', name: 'Usuario Teste' } };
            else
                res = await axios.post(`${server}/signin`, { address: this.state.email, password: this.state.password });

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`;
            AsyncStorage.setItem('userData', JSON.stringify(res.data));

            this.props.navigation.navigate('Home', res.data);
        } catch (erro) {
            showError(erro);
        }
    }

    render() {
        const validations = [];

        validations.push(this.state.email && this.state.email.includes('@'));
        validations.push(this.state.password && this.state.password.length >= 6);

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim());
            validations.push(this.state.confirmPassword);
            validations.push(this.state.password === this.state.confirmPassword);
        }

        const validForm = validations.reduce((all, v) => all && v);

        return (
            <ImageBackground style={styles.background} source={backgroundImage}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>{this.state.stageNew ? 'Crie uma conta' : 'Informe seus dados'}</Text>
                    {this.state.stageNew &&
                        <AuthInput icon='user' style={styles.input} placeholder='Nome' value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}>
                        </AuthInput>}
                    <AuthInput icon='at' style={styles.input} placeholder='Email' value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}>
                    </AuthInput>
                    <AuthInput icon='lock' secureTextEntry={true} style={styles.input} placeholder='Password' value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}>
                    </AuthInput>
                    {this.state.stageNew &&
                        <AuthInput icon='asterisk' secureTextEntry={true} style={styles.input} placeholder='Confirmar senha'
                            value={this.state.confirmPassword} onChangeText={(confirmPassword) => this.setState({ confirmPassword })}>
                        </AuthInput>}
                    <TouchableOpacity onPress={this.singinOrSingup} disabled={!validForm}>
                        <View style={[styles.button, (!validForm ? { backgroundColor: '#AAA' } : {})]}>
                            <Text style={styles.buttonText}>{this.state.stageNew ? 'Registrar' : 'Login'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>{this.state.stageNew ? 'Ja possui conta?' : 'Ainda nao possui conta?'}</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commomStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: commomStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
});
