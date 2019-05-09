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
        borderColor: '#888'
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2
    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3
    },
    operation: {
        color: '#fff',
        backgroundColor: '#fa8231'
    }
});

export default (props) => {
    const myStyles = [styles.button];

    if(props.double) myStyles.push(styles.buttonDouble);
    if(props.triple) myStyles.push(styles.buttonTriple);
    if(props.operation) myStyles.push(styles.operation);

    return (
        <TouchableHighlight onPress={props.onClick}>
            <Text style={myStyles}>{props.label}</Text>
        </TouchableHighlight>
    );
}