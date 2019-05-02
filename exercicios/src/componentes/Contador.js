import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Contador extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.numero}</Text>
            </View>
        );
    }
}