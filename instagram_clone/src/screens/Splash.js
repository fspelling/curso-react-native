import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Splash extends React.Component {
    componentDidMount = () => {
        setTimeout(() => {
            this.props.navigation.navigate('App');
        }, 2000);
    }

    render() {
        return (
            <View>
                <Image source={require('../../assets/imgs/icon.png')} style={styles.image} />
                <Text style={styles.header}>Instagram</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        aliginItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    header: {
        fontSize: 50,
        fontWeight: 'bold'
    }
});