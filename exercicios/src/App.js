import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Simples from './componentes/Simples';
import ImparPar from './componentes/ImparPar';

export default () => {
    return <View style={styles.container}>
      <Simples texto='App!' />
      <ImparPar numero='22' />
      <ImparPar numero='1' />
    </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  f40: {
    fontSize: 40
  }
});
