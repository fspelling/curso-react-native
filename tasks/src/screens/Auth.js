import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import AuthInput from '../componentes/AuthInput';
import { server, showError } from '../commom';
import axios from 'axios';

export class Auth extends React.Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    singinOrSingup = async () => {
        if (this.state.stageNew) {
            try {
                await axios.post(`${server}/signup`, {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                });

                Alert.alert('Sucesso', 'Usuario cadastrado');
                this.setState({ stageNew: false });
            } catch (erro) {
                showError(erro);
            }
        }
        else {
            try {
                const res = await axios.post(`${server}/signin`, {
                    email: this.state.email,
                    password: this.state.password
                });

                axios.defaults.headers.commom['Authorization'] = `bearer ${res.data.token}`;
                this.props.navigation.navigate('Home');
            } catch (erro) {
                showError(erro);
            }
        }
    }

    render() {
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
                    <TouchableOpacity onPress={this.singinOrSingup}>
                        <View style={styles.button}>
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
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
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
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
});