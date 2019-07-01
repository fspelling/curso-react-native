import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../store/actions/user';

class Login extends React.Component {
    state = {
        name: 'Provisorio...',
        email: '',
        password: ''
    };

    login = () => {
        this.props.onlogin({ ...this.state });
        this.props.navigation.navigate('Profile');
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='Email' style={styles.input} autoFocus={true}
                    keyboardType='email-address' value={this.state.email}
                    onChangeText={(email) => this.setState({ email })} />
                <TextInput placeholder='Password' style={styles.input}
                    secureTextEntry={true} value={this.state.password}
                    onChangeText={(password) => this.setState({ password })} />
                <TouchableOpacity onPress={this.login} style={styles.buttom}>
                    <Text style={styles.buttomText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { () => this.props.navigation.navigate('Register') }} style={styles.buttom}>
                    <Text style={styles.buttomText}>Criar nova conta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        onlogin: (user) => dispatch(login(user))
    };
}

export default connect(null, mapDispatchToProps)(Login);