import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './componentes/Button';
import Display from './componentes/Display';

const stateInitial = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  value: [0, 0],
  corrent: 0
};

export default class App extends React.Component {
  state = { ...stateInitial };

  addDigit = (n) => {
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) return;

    const correntValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = `${correntValue}${n}`;

    this.setState({ displayValue, clearDisplay: false });

    if (n !== '.') {
      const newValue = parseFloat(displayValue);
      const value = [...this.state.value];
      value[this.state.corrent] = newValue;

      this.setState({ value });
    }
  }

  clearCalc = () => {
    this.setState({ ...stateInitial });
  }

  setOperation = (operation) => {
    if (this.state.corrent === 0) {
      this.setState({ operation, clearDisplay: true, corrent: 1 });
    } else {
      const equals = operation === '=';
      const value = [...this.state.value];

      try {
        value[0] = eval(`${value[0]} ${this.state.operation} ${value[1]}`);
      }
      catch (e) {
        value[0] = this.state.value[0];
      }

      value[1] = 0;

      this.setState({
        displayValue: value[0].toString(),
        operation: equals ? null : operation,
        corrent: equals ? 0 : 1,
        clearDisplay: equals,
        value
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearCalc} />
          <Button label='/' operation onClick={() => this.setOperation('/')} />
          <Button label='7' onClick={() => this.addDigit(7)} />
          <Button label='8' onClick={() => this.addDigit(8)} />
          <Button label='9' onClick={() => this.addDigit(9)} />
          <Button label='*' operation onClick={() => this.setOperation('*')} />
          <Button label='4' onClick={() => this.addDigit(4)} />
          <Button label='5' onClick={() => this.addDigit(5)} />
          <Button label='6' onClick={() => this.addDigit(6)} />
          <Button label='-' operation onClick={() => this.setOperation('-')} />
          <Button label='1' onClick={() => this.addDigit(1)} />
          <Button label='2' onClick={() => this.addDigit(2)} />
          <Button label='3' onClick={() => this.addDigit(3)} />
          <Button label='+' operation onClick={() => this.setOperation('+')} />
          <Button label='0' double onClick={() => this.addDigit(0)} />
          <Button label='.' onClick={() => this.addDigit('.')} />
          <Button label='=' operation onClick={() => this.setOperation('=')} />
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
