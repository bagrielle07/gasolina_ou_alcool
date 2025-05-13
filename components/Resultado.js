import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class Resultado extends Component {
  render() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.box}>
          <Text style={styles.texto}>Compensa abastecer com:</Text>
          <Text style={styles.resultado}>{this.props.resultado}</Text>
          <Button title="Fechar" color="#FF69B4" onPress={this.props.fechar} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  texto: {
    fontSize: 22,
    marginBottom: 10,
    color: '#333',
  },
  resultado: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 20,
  },
});
