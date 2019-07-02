import React from 'react';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';
import { connect } from 'react-redux';

class Feed extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <ScrollView>
                    <FlatList data={this.props.posts} keyExtractor={(item) => item.id.toString()}
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

const mapStateToProps = ({posts}) => {
    return {
        posts: posts.posts
    };
}

export default connect(mapStateToProps)(Feed);