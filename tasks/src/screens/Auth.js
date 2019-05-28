import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import commomStyle from '../commomStyles';
import backgroundImage from '../../assets/imgs/login.jpg';

export class Auth extends React.Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    singinOrSingup = () => {
        if (this.state.stageNew) { }
        else { }
    }

    render() {
        return (
            <ImageBackground style={styles.background} source={backgroundImage}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>{this.state.stageNew ? 'Crie uma conta' : 'Informe seus dados'}</Text>
                    {this.state.stageNew &&
                        <TextInput style={styles.input} placeholder='Nome' value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}>
                        </TextInput>}
                    <TextInput style={styles.input} placeholder='Email' value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}>
                    </TextInput>
                    <TextInput style={styles.input} placeholder='Password' value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}>
                    </TextInput>
                    {this.state.stageNew &&
                        <TextInput style={styles.input} placeholder='Confirmar senha' value={this.state.confirmPassword}
                            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}>
                        </TextInput>}
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
});