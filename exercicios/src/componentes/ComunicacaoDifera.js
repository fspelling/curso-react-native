import React from 'react';
import { View, Text } from 'react-native';

const fonte = { style: { fontSize: 30 } };

const Filho = (props) =>
    (
        <View>
            <Text {...fonte}>Filho: {props.nome} {props.sobrenome}</Text>
        </View>
    );

const Pai = (props) =>
    (
        <View>
            <Text {...fonte}>Pai: {props.nome} {props.sobrenome}</Text>
            {React.Children.map(props.children, c => React.cloneElement(c, {...props, ...c.props}))}
        </View>
    );

const Avo = (props) =>
    (
        <View>
            <Text {...fonte}>Avo: {props.nome} {props.sobrenome}</Text>
            <Pai nome='Andre' sobrenome={props.sobrenome}>
                <Filho nome='Ana' />
                <Filho nome='Gui' />
                <Filho nome='Davi' />
            </Pai>
            <Pai {...props} nome='Paulo'>
                <Filho nome='Bia' />
                <Filho nome='Gio' />
            </Pai>
        </View>
    );

export default Avo;
export { Filho, Pai, Avo };