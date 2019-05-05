import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Padrao from '../estilos/Padrao';

export const Entrada = (props) =>
    (
        <TextInput value={props.texto} style={Padrao.input} value={props.texto} onChangeText={props.chamarQuandoAlterar} />
    );

export default class TextoSincronizado extends React.Component {
    state = {
        texto: ''
    };

    chamarQuandoAlterar = (texto) => this.setState({ texto });

    render() {
        return (
            <View>
                <Text style={Padrao.font40}>{this.state.texto}</Text>
                <Entrada texto={this.state.texto} chamarQuandoAlterar={this.chamarQuandoAlterar} />
            </View>
        );
    }
}