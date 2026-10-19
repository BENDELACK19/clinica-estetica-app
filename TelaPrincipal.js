import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import styles from './style';


export default function TelaPrincipal({ navigation, route }) {
  const usuario = route.params?.usuario; // <- pega o email do usuário logado

  return (
    <View style={styles.container_principal}>
      <View style={styles.header_principal}>
        <Text style={styles.boasVindas_principal}>Bem-vindo(a) à La Belle Lune!</Text>
        <Text style={styles.subtitulo_principal}>Cuide de você com quem entende de beleza</Text>
      </View>

      <Image
        source={{ uri: "https://imgur.com/DpR5FRe.png" }}
        style={styles.imagem_principal}
      />

      <View style={styles.botoesContainer_principal}>
        <TouchableOpacity
          style={styles.botao_principal}
          onPress={() => navigation.navigate("Agendar", { usuario })}
        >
          <Text style={styles.textoBotao_principal}>📅 Agendar Consulta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao_principal, { backgroundColor: "#D6BBFB" }]}
          onPress={() => navigation.navigate("MinhasConsultas", { usuario })}
        >
          <Text style={[styles.textoBotao_principal, { color: "#4B0082" }]}>
            🩵 Minhas Consultas
          </Text>
        </TouchableOpacity>

        {/* Botão visível apenas para o admin */}
        {usuario === "admin@labellelune.com" && (
          <TouchableOpacity
            style={[styles.botao_principal, { backgroundColor: "#B39DDB" }]}
            onPress={() => navigation.navigate("Admin")}
          >
            <Text style={[styles.textoBotao_principal, { color: "#4B0082" }]}>
              👑 Área do Administrador
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}




