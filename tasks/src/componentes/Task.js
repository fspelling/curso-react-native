import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';
import commomStyle from '../commomStyles';
import Swipeable from 'react-native-swipeable';

export default (props) => {
    let check = null;

    if (props.doneAt !== null) {
        check = (
            <View style={styles.done}>
                <Icon name="check" size={20} color={commomStyle.colors.secondary} />
            </View>
        );
    } else {
        check = (
            <View style={styles.pending} />
        );
    }

    const descStyle = props.doneAt !== null ? { textDecorationLine: 'line-through' } : {};

    const contentLeft = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color='#FFF' />
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    );

    const rightContent = [
        <TouchableOpacity style={[styles.exclude, { justifyContent: 'flex-start', paddingLeft: 20 }]}
            onPress={() => props.onDelete(props.id)}>
            <Icon name='trash' size={30} color='#FFF' />
        </TouchableOpacity>,
    ]

    return (
        <Swipeable leftActionActivationDistance={200}
            onLeftActionActivate={() => props.onDelete(props.id)}
            leftContent={contentLeft} rightButtons={rightContent}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.togleTaskCheck(props.id)}>
                    <View style={styles.checkContainer}>{check}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description, descStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')}</Text>
                </View>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    done: {
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        borderWidth: 1,
        width: 25,
        height: 25,
        borderRadius: 25,
        borderColor: '#555'
    },
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        color: '#AAA'
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%'
    },
    description: {
        fontFamily: commomStyle.fontFamily,
        color: commomStyle.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commomStyle.fontFamily,
        color: commomStyle.colors.subText,
        fontSize: 12
    },
    exclude: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    excludeText: {
        fontFamily: commomStyle.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    }
});