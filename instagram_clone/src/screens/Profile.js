import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gravatar } from 'react-native-gravatar';
import { connect } from 'react-redux';
import { logout } from '../store/actions/user';

class Profile extends React.Component {
    logout = () => {
        this.props.onlogout();
        this.props.navigation.navigate('Auth');
    }

    render() {
        const options = { email: this.props.email, secure: true };

        return (
            <View style={styles.container}>
                <Gravatar options={options} style={styles.avatar} />
                <Text style={styles.nickName}>{this.props.name}</Text>
                <Text style={styles.email}>{this.props.email}</Text>
                <TouchableOpacity onPress={this.logout} style={styles.buttom}>
                    <Text style={styles.buttomText}>Sair</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 100
    },
    nickName: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold'
    },
    email: {
        marginTop: 20,
        fontSize: 20
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

const mapDispatchToState = ({ user }) => {
    return {
        name: user.name,
        email: user.email
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onlogout: () => dispatch(logout())
    };
}

export default connect(mapDispatchToState, mapDispatchToProps)(Profile);