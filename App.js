import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Resultado from './components/Resultado';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alcool: '',
      gasolina: '',
      resultado: '',
      modalVisible: false,
      telaInicial: true
    };

    this.calcular = this.calcular.bind(this);
    this.fechar = this.fechar.bind(this);
    this.iniciarApp = this.iniciarApp.bind(this);
  }

  iniciarApp() {
    this.setState({ telaInicial: false });
  }

  async calcular() {
    const { alcool, gasolina } = this.state;

    if (alcool === '' || gasolina === '') {
      alert('Preencha os dois campos!');
      return;
    }

    const valorAlcool = parseFloat(alcool);
    const valorGasolina = parseFloat(gasolina);

    if (isNaN(valorAlcool) || isNaN(valorGasolina)) {
      alert('Digite valores válidos!');
      return;
    }

    const resultado = valorAlcool / valorGasolina;
    const combustivel = resultado < 0.7 ? 'Álcool' : 'Gasolina';

    await AsyncStorage.setItem('@ultimo_resultado', combustivel);

    this.setState({
      resultado: combustivel,
      modalVisible: true
    });

    Keyboard.dismiss();
  }

  fechar() {
    this.setState({ modalVisible: false });
  }

  render() {
    // Tela inicial
    if (this.state.telaInicial) {
      return (
        <ImageBackground
          source={require('./assets/Fundo_Icinial.jpg')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <TouchableOpacity style={styles.botaoInicial} onPress={this.iniciarApp}>
              <Text style={styles.botaoTexto}>INICIAR</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      );
    }

    // Tela de cálculo
    return (
      <ImageBackground
        source={require('./assets/fundoo.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.titulo}>Gasolina ou Álcool?</Text>

          <TextInput
            style={styles.input}
            placeholder="Preço do Álcool"
            keyboardType="numeric"
            placeholderTextColor="#ff99ff"
            onChangeText={(valor) => this.setState({ alcool: valor })}
          />

          <TextInput
            style={styles.input}
            placeholder="Preço da Gasolina"
            keyboardType="numeric"
            placeholderTextColor="#ff99ff"
            onChangeText={(valor) => this.setState({ gasolina: valor })}
          />

          <TouchableOpacity style={styles.botaoCalcular} onPress={this.calcular}>
            <Text style={styles.botaoTexto}>CALCULAR</Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={this.state.modalVisible}
            animationType="slide"
          >
            <Resultado resultado={this.state.resultado} fechar={this.fechar} />
          </Modal>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ea32d4',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontSize: 18,
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ea32d4',
    color: '#ea32d4',
  },
  botaoCalcular: {
    backgroundColor: '#FF69B4',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  botaoInicial: {
    backgroundColor: '#FF1493',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
