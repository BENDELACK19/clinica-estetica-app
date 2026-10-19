import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // ===== Tela de Login e Cadastro =====
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    paddingHorizontal: 20,
  },

  logo: {
    width: 350,
    height: 250,
    marginBottom: 25,
  },

  input: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#999',
    padding: 10,
    marginBottom: 10,
    width: '85%',
    backgroundColor: 'white',
    color: '#333',
  },

  botaoContainer: {
    width: '80%',
    marginTop: 25,
    alignItems: 'center',
  },

  botaoEspacado: {
    width: '100%',
    marginVertical: 8, // Espaçamento entre botões
  },

  bemvindo: {
    fontFamily: 'bold',
    justifyContent: 'center',
  },

  // ===== Tela Principal =====
  container_principal: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  header_principal: {
    alignItems: 'center',
    marginBottom: 20,
  },

  boasVindas_principal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    justifyContent: 'center',
  },

  subtitulo_principal: {
    fontSize: 16,
    color: '#7B7B7B',
    textAlign: 'center',
    marginTop: 5,
  },

  imagem_principal: {
    width: 180,
    height: 140,
    marginVertical: 30,
  },

  botoesContainer_principal: {
    width: '100%',
  },

  botao_principal: {
    backgroundColor: '#9C27B0',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
  },

  textoBotao_principal: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },

  // ===== Tela Agendar (Componente Agendar.js) - Não usados, mas mantidos por compatibilidade
  container_agendar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 20,
  },

  label_agendar: {
    fontSize: 16,
    marginBottom: 5,
  },

  input_agendar: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  
  // ===== Tela Minhas Consultas =====
  container_consulta: {
    flex: 1,
    backgroundColor: 'pink',
    padding: 20,
  },

  titulo_consulta: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A1B9A',
    textAlign: 'center',
  },

  card_consulta: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  texto_consulta: {
    fontSize: 16,
  },
});