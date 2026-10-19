import React, { useState } from 'react';
import { View, TextInput, Image, Button, Alert } from 'react-native';
import styles from './style';

export default function TelaCadastro({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const API_KEY = 'AIzaSyAW1MywHsTlIqFV6kj6cNsc-13t84tWYKc';
  const FIREBASE_SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

  async function register() {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      const resposta = await fetch(FIREBASE_SIGNUP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: usuario,
          password: senha,
          returnSecureToken: true,
        }),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', data.error.message);
      }
    } catch (erro) {
      Alert.alert('Erro', 'Falha ao cadastrar: ' + erro.message);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: 'https://imgur.com/DpR5FRe.png' }}
      />

      <TextInput
        style={styles.input}
        placeholder="Email:"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha:"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha:"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <View style={styles.botaoContainer}>
        <View style={styles.botaoEspacado}>
          <Button title="Finalizar Cadastro" onPress={register} />
        </View>
        <View style={styles.botaoEspacado}>
          <Button
            title="Voltar ao Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </View>
  );
}
