import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Author from './Author';
import Comments from './Comments';

export default class Post extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={this.props.image} style={styles.image} />
                <Author email='fulano@gmail.com' nickName='Fulano' />
                <Comments comments={this.props.comments} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'contain'
    }
});