import React from 'react';
import {
    Modal, View, Alert, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity,
    DatePickerIOS, StyleSheet, DatePickerAndroid, Platform
} from 'react-native';
import moment from 'moment';
import commonStyle from '../commomStyles';
import commomStyles from '../commomStyles';

const initialState = { desc: '', date: new Date() };

export default class NewTask extends React.Component {
    state = { ...initialState };

    save = () => {
        if (!this.state.desc.trim()) {
            Alert.alert('Dados invalidos', 'Informe uma descricao para a tarefa');
            return;
        }

        const data = { ...this.state };
        this.props.onSave(data);
        this.setState({ ...initialState });
    }

    handleDateAndroidChenged = () => {
        DatePickerAndroid.open({
            date: this.state.date
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                const momentDate = moment(this.state.date);
                momentDate.date(e.day);
                momentDate.month(e.month);
                momentDate.year(e.year);

                this.setState({ date: momentDate.toDate() });
            }
        });
    }

    render() {
        let datePicker = undefined;

        if (Platform.OS === 'ios') {
            datePicker = (
                <DatePickerIOS mode='date' date={this.state.date}
                    onDateChange={(date) => this.setState({ date })} />
            );
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChenged}>
                    <Text style={styles.date}>
                        {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible} animationType='slide'
                transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova tarefa</Text>
                    <TextInput placeholder='Descricao' style={styles.input}
                        onChangeText={(desc) => this.setState({ desc })}
                        value={this.state.desc} />
                    {datePicker}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableWithoutFeedback onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyle.colors.default
    },
    header: {
        fontFamily: commomStyles.fontFamily,
        backgroundColor: commomStyles.colors.default,
        color: commomStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15
    },
    input: {
        fontFamily: commomStyles.fontFamily,
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    date: {
        fontFamily: commomStyles.fontFamily,
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        textAlign: 'center'
    }
});