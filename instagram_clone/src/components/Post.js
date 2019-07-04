import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Author from './Author';
import Comments from './Comments';
import AddComment from './AddComment';
import { connect } from 'react-redux';

class Post extends React.Component {
    render() {
        const comment = this.props.name ? (<AddComment idPost={this.props.id} />) : null;

        return (
            <View style={styles.container}>
                <Image source={this.props.image} style={styles.image} />
                <Author email={this.props.email} nickName={this.props.nickName} />
                <Comments comments={this.props.comments} />
                {comment}
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

const mapStateToProps = ({user}) => {
    return {
        name: user.name
    };
}

export default connect(mapStateToProps)(Post);