import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from './style'; 

export default function MinhasConsultas({ navigation, route }) {
  const usuario = route.params?.usuario;
  const [agendamentos, setAgendamentos] = useState([]);

  // Função para carregar os agendamentos 
  const carregarAgendamentos = useCallback(async () => {
    const chaveUsuario = `agendamentos_${usuario}`;
    const dados = await AsyncStorage.getItem(chaveUsuario);
    setAgendamentos(dados ? JSON.parse(dados) : []);
  }, [usuario]);

  useFocusEffect(carregarAgendamentos);

  // Função para deletar um agendamento 
  const deletarAgendamento = (indexParaRemover) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja cancelar este agendamento?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => {
            const novosAgendamentos = agendamentos.filter(
              (_, index) => index !== indexParaRemover
            );
            const chaveUsuario = `agendamentos_${usuario}`;

            await AsyncStorage.setItem(chaveUsuario, JSON.stringify(novosAgendamentos));
            setAgendamentos(novosAgendamentos); // Atualiza o estado da tela
            Alert.alert("Sucesso", "Agendamento cancelado.");
          }
        }
      ]
    );
  };
  
  // Função para navegar para edição (Update)
  const navegarParaEdicao = (agendamento, index) => {
    navigation.navigate('Agendar', { 
        usuario: usuario, 
        agendamento: agendamento, // Passa o objeto completo para edição
        index: index 
    });
  }


  return (
    <View style={styles.container_consulta}>
      <Text style={styles.titulo_consulta}>Minhas Consultas</Text>

      <FlatList
        data={agendamentos}
        
        keyExtractor={(item, i) => `${item.data}-${item.hora}-${i}`} 
        renderItem={({ item, index }) => (
          <View style={styles.card_consulta}>
            <Text style={styles.texto_consulta}>Cliente: **{item.nome}**</Text> {/* CORRIGIDO */}
            <Text style={styles.texto_consulta}>Serviço: {item.servico}</Text>
            <Text style={styles.texto_consulta}>
              {item.data} às {item.hora}
            </Text>
            
            {/* BOTÃO DE EDITAR (Update) */}
            <TouchableOpacity
                style={styleLocal.botaoEditar} 
                onPress={() => navegarParaEdicao(item, index)}
            >
                <Text style={styleLocal.textoBotaoEditar}>✏️ Editar</Text>
            </TouchableOpacity>

            {/* BOTÃO DE EXCLUIR (Delete) */}
            <TouchableOpacity 
                style={styleLocal.botaoDeletar} 
                onPress={() => deletarAgendamento(index)}
            >
                <Text style={styleLocal.textoBotaoDeletar}>❌ Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// Estilos específicos para os botões de CRUD no Card de Consulta
const styleLocal = {
    botaoEditar: {
        backgroundColor: '#4CAF50', // Verde
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 5, 
        alignItems: 'center',
    },
    textoBotaoEditar: {
        color: 'white',
        fontWeight: 'bold',
    },
    botaoDeletar: {
        backgroundColor: '#FF6F91', // Rosa
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
        alignItems: 'center',
    },
    textoBotaoDeletar: {
        color: 'white',
        fontWeight: 'bold',
    }
}