import React from 'react';
import { Text } from 'react-native';
import Padrao from '../estilos/Padrao';

const Inverter = (props) => {
    let formated = props.texto.split('').reverse().join('');
    return <Text style={Padrao.ex}>{formated}</Text>
};

const MegaSena = (props) => {
    let [min, max] = [1, 60];
    let numeros = Array(props.numeros || 6).fill(0);

    let lista = numeros.map((item) => {
        let novo = 0;

        while(numeros.includes(novo))
            novo = Math.floor(Math.random() * (max - min + 1)) + min;

        return novo;
    });

    return <Text style={Padrao.ex}>Mega sena: {lista.join(', ')}</Text>;
};

export default Inverter;
export { Inverter, MegaSena };