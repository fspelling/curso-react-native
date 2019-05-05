import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';

const alunos = [
    { id: 1, nome: 'nome1', nota: 7.9 },
    { id: 2, nome: 'nome2', nota: 8.9 },
    { id: 3, nome: 'nome3', nota: 7.9 },
    { id: 4, nome: 'nome4', nota: 4.9 },
    { id: 5, nome: 'nome5', nota: 7.9 },
    { id: 6, nome: 'nome6', nota: 7.9 },
    { id: 7, nome: 'nome7', nota: 9.9 },
    { id: 8, nome: 'nome8', nota: 7.9 },
    { id: 9, nome: 'nome9', nota: 8.9 },
    { id: 10, nome: 'nome10', nota: 6.9 },
    { id: 11, nome: 'nome11', nota: 7.9 },
    { id: 12, nome: 'nome12', nota: 8.9 },
    { id: 13, nome: 'nome13', nota: 7.9 },
    { id: 14, nome: 'nome14', nota: 4.9 },
    { id: 15, nome: 'nome15', nota: 7.9 },
    { id: 16, nome: 'nome16', nota: 7.9 },
    { id: 17, nome: 'nome17', nota: 9.9 },
    { id: 18, nome: 'nome18', nota: 7.9 },
    { id: 19, nome: 'nome19', nota: 8.9 },
    { id: 20, nome: 'nome20', nota: 6.9 }
];

const itemEstilo = {
    paddingHorizontal: 15,
    height: 80,
    backgroundColor: '#DDD',
    borderWidth: 0.5,
    borderColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
};

export const Aluno = (props) =>
    (
        <View style={itemEstilo}>
            <Text>Nome: {props.nome}</Text>
            <Text style={{ fontWeight: 'bold' }}>Nota: {props.nota}</Text>
        </View>
    );

export default () => {
    const renderItems = ({ item }) =>
        (
            <Aluno {...item} />
        );

    return (
        <ScrollView>
            <FlatList data={alunos} renderItem={renderItems} keyExtractor={(_, index) => index.toString()} />
        </ScrollView>
    );
}