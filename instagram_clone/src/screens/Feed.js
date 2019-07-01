import React from 'react';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';

export default class Feed extends React.Component {
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
