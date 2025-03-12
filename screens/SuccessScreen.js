import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SuccessScreen({route,navigation}) {
  const {reward} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 ¡Felicidades! 🎉</Text>
      <Text style={styles.subtitle}>Has reclamado:</Text>
      <Text style={styles.reward}>{reward}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("BattlePassMain")}>
        <Text style={styles.buttonText}>Volver al Pase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#32CD32",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  reward: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffd700",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff69b4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
