import React from 'react';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';

export default class Feed extends React.Component {
    state = {
        posts: [
            {
                id: Math.random(),
                nickName: 'Fulano 1',
                email: 'fulano1@email.com',
                image: require('../../assets/imgs/fence.jpg'),
                comments: [
                    { nickName: 'Test 1', comment: 'Comment 1' },
                    { nickName: 'Test 2', comment: 'Comment 2' }
                ]
            },
            {
                id: Math.random(),
                nickName: 'Fulano 2',
                email: 'fulano1@email.com',
                image: require('../../assets/imgs/bw.jpg'),
                comments: [
                    { nickName: 'Test 3', comment: 'Comment 3' },
                    { nickName: 'Test 4', comment: 'Comment 4' }
                ]
            }
        ]
    };

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <ScrollView>
                    <FlatList data={this.state.posts} keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Post key={item.id} {...item} />} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    }
});
