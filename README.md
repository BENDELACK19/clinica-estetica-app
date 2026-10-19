# 💜 La Belle Lune — App de Agendamento para Clínica de Estética

Aplicativo mobile desenvolvido para a clínica de estética **La Belle Lune**, onde as clientes criam conta, escolhem um serviço, um dia e um horário, e acompanham suas consultas. Existe também uma área restrita para a administração visualizar os agendamentos.

## 🎓 Contexto acadêmico

Projeto desenvolvido em dupla na disciplina **Programação para Dispositivos Móveis em Android**, do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **Universidade Estácio de Sá**, no 2º semestre de 2025.

Diferente de um exercício com requisitos prontos, o app foi construído para um **cliente real**: levantamos as necessidades da clínica com a parte interessada (o que ela precisava agendar, quais serviços e horários oferece) e transformamos isso em um aplicativo funcional.

## ✨ Funcionalidades

- **Autenticação** de usuários (cadastro e login por e-mail e senha) com **Firebase Authentication**
- **Agendamento de consultas**: nome, serviço, dia (próximos 15 dias) e horário
- **Bloqueio de horários já ocupados** na hora de agendar
- **Minhas Consultas**: listagem, **edição** e **cancelamento** (com confirmação) dos agendamentos — CRUD completo
- **Área do administrador**: lista de todos os agendamentos com cliente, serviço, data e usuário
- Persistência local dos agendamentos com **AsyncStorage**

### Serviços e horários

| Serviços | Horários |
| --- | --- |
| Limpeza de pele, Drenagem, Massagem, Retorno | 09:00, 10:00, 11:00, 14:00, 15:00, 16:00 |

## 📱 Telas

| Tela | O que faz |
| --- | --- |
| Login | Autentica o usuário via Firebase |
| Cadastro | Cria a conta (com confirmação de senha) |
| Principal | Boas-vindas e atalhos para as funções do app |
| Agendar | Criação e edição de consultas |
| Minhas Consultas | Lista, edita e exclui os agendamentos do usuário |
| Admin | Visão geral de todos os agendamentos (só para a conta administradora) |


## 🛠️ Tecnologias

- [React Native](https://reactnative.dev/) 0.81 + [Expo](https://expo.dev/) SDK 54
- [React Navigation](https://reactnavigation.org/) (stack navigator)
- [Firebase Authentication](https://firebase.google.com/docs/auth) (via API REST)
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)

## 🚀 Como rodar

**Pré-requisitos:** [Node.js](https://nodejs.org/) (versão LTS) e o app **Expo Go** no celular (ou um emulador Android/iOS).

```bash
# 1. Clone o repositório
git clone https://github.com/BENDELACK19/clinica-estetica-app.git
cd la-belle-lune-app

# 2. Instale as dependências
npm install

# 3. Inicie o projeto
npx expo start
```

Escaneie o QR code com o Expo Go (Android) ou com a câmera (iOS). Também é possível usar `npm run android`, `npm run ios` ou `npm run web`.

### Configuração do Firebase

O login e o cadastro usam um projeto Firebase com **Authentication (e-mail/senha)** habilitado. Para usar o seu próprio projeto, troque a chave de API (`API_KEY`) em `TelaLogin.js` e `TelaCadastro.js` pela do seu projeto.

### Conta de administrador

A área do administrador é exibida apenas para a conta administradora da clínica, definida em `TelaPrincipal.js`. Para testar com o seu próprio Firebase, cadastre uma conta com o e-mail definido ali.

## 📂 Estrutura

```
├── App.js               # Navegação entre as telas
├── index.js             # Ponto de entrada (Expo)
├── TelaLogin.js         # Login
├── TelaCadastro.js      # Cadastro
├── TelaPrincipal.js     # Menu principal
├── Agendar.js           # Criar/editar agendamento
├── MinhasConsultas.js   # Listar, editar e excluir
├── TelaAdmin.js         # Área do administrador
├── style.js             # Estilos compartilhados
└── assets/              # Ícones e splash
```

## ⚠️ Limitações conhecidas e próximos passos

Esta é a versão (MVP) entregue dentro do prazo da disciplina, e algumas decisões foram simplificadas:

- Os agendamentos ficam no **AsyncStorage** (armazenamento local do aparelho), então não são sincronizados entre dispositivos. A área do administrador só enxerga os agendamentos feitos no mesmo aparelho.
- A verificação de horário ocupado considera apenas os agendamentos do próprio usuário.
- O acesso de administrador é checado no app pelo e-mail, sem regras no servidor.

**Ideias de evolução:** migrar os agendamentos para o Firestore, validar disponibilidade e permissões no backend, e mover a configuração do Firebase para variáveis de ambiente.


## 📄 Licença

Distribuído sob a licença 0BSD, conforme definido no `package.json`.
