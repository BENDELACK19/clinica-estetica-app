import React, { useState } from 'react';
import { View, TextInput, Image, Button } from 'react-native';
import styles from './style';

const FIREBASE_LOGIN_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAW1MywHsTlIqFV6kj6cNsc-13t84tWYKc';

export default function TelaLogin({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    try {
      const resposta = await fetch(FIREBASE_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: usuario,
          password: senha,
          returnSecureToken: true,
        }),
      });

      const data = await resposta.json();
      setLoading(false);

      if (!resposta.ok) {
        alert(data.error?.message || 'Erro ao fazer login');
        return;
      }

      navigation.navigate('Principal', { usuario: data.email });
    } catch (erro) {
      setLoading(false);
      alert('Erro de conexão: ' + erro.message);
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
        placeholder="E-mail:"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha:"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <View style={styles.botaoContainer}>
        <View style={styles.botaoEspacado}>
          <Button
            title={loading ? 'Entrando...' : 'Fazer Login'}
            onPress={login}
            disabled={loading}
          />
        </View>
        <View style={styles.botaoEspacado}>
          <Button
            title="Fazer Cadastro"
            onPress={() => navigation.navigate('Cadastro')}
          />
        </View>
      </View>
    </View>
  );
}
