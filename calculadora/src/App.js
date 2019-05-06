import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './componentes/Button';
import Display from './componentes/Display';

export default class App extends React.Component {
  state = {
    displayValue: '0'
  };

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue}/>
        <View style={styles.buttons}>
          <Button label='AC' onClick={} />
          <Button label='/' onClick={} />
          <Button label='7' onClick={} />
          <Button label='8' onClick={} />
          <Button label='9' onClick={} />
          <Button label='*' onClick={} />
          <Button label='4' onClick={} />
          <Button label='5' onClick={} />
          <Button label='6' onClick={} />
          <Button label='-' onClick={} />
          <Button label='1' onClick={} />
          <Button label='2' onClick={} />
          <Button label='3' onClick={} />
          <Button label='+' onClick={} />
          <Button label='0' onClick={} />
          <Button label='.' onClick={} />
          <Button label='=' onClick={} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
