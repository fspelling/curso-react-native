import React from 'react';
import { View } from 'react-native';
import Header from './src/components/Header';
import Post from './src/components/Post';

export default class App extends React.Component {
  render() {
    const comments = [
      { nickName: 'Fulano 1', comment: 'comentario 1' },
      { nickName: 'Fulano 2', comment: 'comentario 2' }
    ];

    return (
      <View style={{ flex: 1 }}>
        <Header />
        <Post image={require('./assets/imgs/fence.jpg')} comments={comments} />
      </View>
    );
  }
}