import React from 'react';
import { Text, View } from 'react-native';
import Padrao from '../estilos/Padrao';
import IIF from './IIF';

export default (props) => {
    return <View>
        <IIF value={true}>
            {parOuImpar(props.numero)}
        </IIF>
    </View>
}

function parOuImpar(numero) {
    return numero % 2 == 0 ? <Text style={Padrao.ex}>Par</Text> : <Text style={Padrao.ex}>Impar</Text>;
}