import React from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';

export default class Comments extends React.Component {
    render() {
        let view = undefined;

        if (this.props.comments) {
            view = this.props.comments.map((item, index) => {
                return (
                    <View style={styles.commentContainer} key={index}>
                        <Text style={styles.nickName}>{item.nickName}</Text>
                        <Text style={styles.comment}>{item.comment}</Text>
                    </View>
                );
            });
        }

        return (
            <View style={styles.container}>
                {view}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    commentContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    nickName: {
        color: '#444',
        marginLeft: 5,
        fontWeight: 'bold'
    },
    comment: {
        color: '#555'
    }
});