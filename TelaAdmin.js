import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaAdmin({ navigation }) {
  const [todasConsultas, setTodasConsultas] = useState([]);

  useEffect(() => {
    const carregarTodasConsultas = async () => {
      try {
        const todasChaves = await AsyncStorage.getAllKeys();
        const chavesAgendamentos = todasChaves.filter(chave => chave.startsWith('agendamentos_'));

        const promessas = chavesAgendamentos.map(async (chave) => {
          const dados = await AsyncStorage.getItem(chave);
          const consultas = JSON.parse(dados || '[]');
          const usuario = chave.replace('agendamentos_', '');
          return consultas.map(c => ({ ...c, usuario }));
        });

        const resultados = await Promise.all(promessas);
        const consultasUnificadas = resultados.flat();

        setTodasConsultas(consultasUnificadas);
      } catch (erro) {
        console.log('Erro ao carregar consultas: ', erro);
      }
    };

    const unsubscribe = navigation.addListener('focus', carregarTodasConsultas);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📋 Consultas (Administrador)</Text>

      <FlatList
        data={todasConsultas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.texto}>👤 Cliente: {item.nome}</Text>
            <Text style={styles.texto}>💆 Serviço: {item.servico}</Text>
            <Text style={styles.texto}>📅 Data: {new Date(item.data).toLocaleString()}</Text>
            <Text style={styles.texto}>📧 Usuário: {item.usuario}</Text>
          </View>
        )}
      />

      <Button title="⬅ Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    padding: 20
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6A1B9A',
    textAlign: 'center'
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2
  },
  texto: {
    fontSize: 16,
    marginBottom: 3
  },
});
