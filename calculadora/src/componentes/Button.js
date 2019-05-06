import React from 'react';
import { Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        textAlign: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        boderColor: '#888'
    }
});

export default (props) => (
    <TouchableHighlight onPress={props.onClick}>
        <Text style={styles.button}>{props.label}</Text>
    </TouchableHighlight>
);