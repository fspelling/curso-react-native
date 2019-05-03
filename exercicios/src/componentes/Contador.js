import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Contador extends Component {
    state = {
        numero: this.props.numero || 0
    };

    Incrementar = () => {
        this.setState({ numero: this.state.numero + 1 });
    }

    Zerar = () => {
        this.setState({ numero: this.props.numero || 0 });
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 40 }}>{this.state.numero}</Text>
                <TouchableHighlight onPress={this.Incrementar} onLongPress={this.Zerar}>
                    <Text>Incrementar/zerar</Text>
                </TouchableHighlight>
            </View>
        );
    }
}