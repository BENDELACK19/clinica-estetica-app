import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgendarConsulta({ navigation, route }) {
  const usuario = route.params?.usuario;

  const agendamentoParaEditar = route.params?.agendamento;
  const indexEdicao = route.params?.index; 
  
  const isEditando = agendamentoParaEditar !== undefined; 


  const [nome, setNome] = useState(agendamentoParaEditar ? agendamentoParaEditar.nome : '');
  const [dataSelecionada, setDataSelecionada] = useState(agendamentoParaEditar ? agendamentoParaEditar.data : null);
  const [horaSelecionada, setHoraSelecionada] = useState(agendamentoParaEditar ? agendamentoParaEditar.hora : null);
  const [agendamentos, setAgendamentos] = useState([]); // Lista de todos os agendamentos
  const [servicoSelecionado, setServicoSelecionado] = useState(agendamentoParaEditar ? agendamentoParaEditar.servico : null);


const gerarDias = (quantidade) => {
  const datas = [];
  const hoje = new Date();

  for (let i = 0; i < quantidade; i++) {
    const novaData = new Date(hoje);
    novaData.setDate(hoje.getDate() + i);
    datas.push(novaData.toISOString().split("T")[0]);
  }

  return datas;
};

const dias = gerarDias(15); 

  const horarios = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  const servicos = ["Limpeza de pele", "Drenagem", "Massagem", "Retorno"];

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    const chaveUsuario = `agendamentos_${usuario}`;
    const armazenado = await AsyncStorage.getItem(chaveUsuario);
    if (armazenado) setAgendamentos(JSON.parse(armazenado));
  };

  const horarioDisponivel = (dia, hora) => {

    if (isEditando && agendamentoParaEditar.data === dia && agendamentoParaEditar.hora === hora) {
        return true;
    }
    // Verifica se o horário está ocupado por outro agendamento
    return !agendamentos.some(a => a.data === dia && a.hora === hora);
  };

  const salvarAgendamento = async () => {
    if (!nome || !dataSelecionada || !horaSelecionada || !servicoSelecionado) {
      Alert.alert("Erro", "Preencha tudo antes de confirmar!");
      return;
    }

    const novoAg = { nome, data: dataSelecionada, hora: horaSelecionada, servico: servicoSelecionado };
    const chaveUsuario = `agendamentos_${usuario}`;
    let atualizado = [...agendamentos];
    let mensagem = "";

    if (isEditando) {
        // Lógica de Update (Atualizar)
        atualizado[indexEdicao] = novoAg;
        mensagem = "Agendamento atualizado com sucesso!";
    } else {
        // Lógica de Create (Criar)
        atualizado = [...agendamentos, novoAg];
        mensagem = "Agendamento criado com sucesso!";
    }
    
    await AsyncStorage.setItem(chaveUsuario, JSON.stringify(atualizado));
    Alert.alert("Sucesso", mensagem);
    navigation.navigate("MinhasConsultas", { usuario });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{isEditando ? 'Editar Consulta' : 'Agendar Consulta'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.subtitulo}>Selecione o serviço:</Text>
      <View style={styles.servicosContainer}>
        {servicos.map((srv) => (
          <TouchableOpacity
            key={srv}
            style={[styles.servicoBtn, servicoSelecionado === srv && styles.btnSelecionado]}
            onPress={() => setServicoSelecionado(srv)}
          >
            <Text style={styles.servicoTexto}>{srv}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitulo}>Selecione o dia:</Text>
      <View style={styles.lista}>
        {dias.map((dia) => (
          <TouchableOpacity
            key={dia}
            style={[styles.botao, dataSelecionada === dia && styles.btnSelecionado]}
            onPress={() => setDataSelecionada(dia)}
          >
            <Text>{dia}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitulo}>Horários:</Text>
      <View style={styles.lista}>
        {horarios.map((hr) => {
          const disponivel = horarioDisponivel(dataSelecionada, hr);
          return (
            <TouchableOpacity
              key={hr}
              style={[
                styles.botao,
                horaSelecionada === hr && styles.btnSelecionado,
                !disponivel && styles.horarioIndisponivel
              ]}
              disabled={!disponivel}
              onPress={() => setHoraSelecionada(hr)}
            >
              <Text style={!disponivel ? styles.txtIndisponivel : {}}>{hr}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.confirmar} onPress={salvarAgendamento}>
        <Text style={styles.confirmarTxt}>{isEditando ? 'Salvar Edição' : 'Confirmar Agendamento'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD1D9",
    padding: 20,
  },
  titulo: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10
  },
  lista: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    minWidth: 80,
    alignItems: "center",
  },
  btnSelecionado: {
    backgroundColor: "#FF6F91",
  },
  horarioIndisponivel: {
    backgroundColor: "#999",
  },
  txtIndisponivel: {
    color: "#555",
  },
  servicosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10
  },
  servicoBtn: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
  },
  servicoTexto: {
    fontSize: 14
  },
  confirmar: {
    backgroundColor: "#FF6F91",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  confirmarTxt: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});