import React from 'react';
import { StyleSheet, View } from 'react-native';
import Simples from './componentes/Simples';
import ImparPar from './componentes/ImparPar';
import Inverter, { MegaSena } from './componentes/Multi';

export default () => {
    return <View style={styles.container}>
      <Simples texto='App!' />
      <ImparPar numero='22' />
      <ImparPar numero='1' />
      <Inverter texto='Test' />
      <MegaSena numeros={4} />
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
