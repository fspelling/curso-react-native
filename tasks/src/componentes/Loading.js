import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default class Loading extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.isLoading && (<ActivityIndicator size='large'/>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    }
});