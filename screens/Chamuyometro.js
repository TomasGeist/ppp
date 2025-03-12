import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function Chamuyometro() {
  const [chamuyo, setChamuyo] = useState("");
  const [calificacion, setCalificacion] = useState(null);
  const [consejo, setConsejo] = useState("");
  const [tema, setTema] = useState("");
  const [respuestaChamuyo, setRespuestaChamuyo] = useState("");

  const consejosAleatorios = [
    "Está bueno, pero probá con algo más divertido.",
    "Suena bien, pero sé más directo.",
    "Usá más humor, rompe el hielo.",
    "Demasiado clásico, sorprendé más.",
    "Buen intento, pero bajale un poco a lo intenso.",
    "Interesante, pero agregale un cumplido sincero.",
  ];

  const chamuyosAleatorios = [
    "¿Creés en el amor a primera vista o tengo que pasar de nuevo?",
    "¿Sos de acá o te escapaste del cielo?",
    "Perdón, pero mi mapa se rompió… ¿cómo llego a tu corazón?",
    "¿Te dolió cuando caíste del cielo o ya estás acostumbrado/a a ser un ángel?",
    "¿Me podés prestar un beso? Prometo devolvértelo.",
    "No soy fotógrafo, pero puedo imaginarme juntos.",
    "¿Te gusta el café? Porque tenés todo lo que necesito para empezar bien el día.",
  ];

  // Calificar chamuyo
  const handleCalificar = () => {
    if (!chamuyo.trim()) return;
    const porcentaje = Math.floor(Math.random() * 101); // 0 - 100
    const consejoRandom =
      consejosAleatorios[Math.floor(Math.random() * consejosAleatorios.length)];

    setCalificacion(porcentaje);
    setConsejo(consejoRandom);
  };

  // Generar chamuyo
  const handleGenerarChamuyo = () => {
    if (!tema.trim()) return;
    const chamuyoRandom =
      chamuyosAleatorios[Math.floor(Math.random() * chamuyosAleatorios.length)];

    setRespuestaChamuyo(`Chamuyo para "${tema}": ${chamuyoRandom}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🔥 Chamuyómetro 🔥</Text>

        {/* Calificar Chamuyo */}
        <View style={styles.section}>
          <Text style={styles.label}>💬 Escribí tu chamuyo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: ¿Creés en el amor a primera vista?"
            value={chamuyo}
            onChangeText={setChamuyo}
          />
          <TouchableOpacity style={styles.button} onPress={handleCalificar}>
            <Text style={styles.buttonText}>Calificar Chamuyo</Text>
          </TouchableOpacity>

          {calificacion !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>💯 Puntuación: {calificacion}%</Text>
              <Text style={styles.resultText}>💡 Consejo: {consejo}</Text>
            </View>
          )}
        </View>

        {/* Generar Chamuyo */}
        <View style={styles.section}>
          <Text style={styles.label}>❓ ¿Sobre qué querés chamuyar?</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Perros, café, cine, música..."
            value={tema}
            onChangeText={setTema}
          />
          <TouchableOpacity style={styles.button} onPress={handleGenerarChamuyo}>
            <Text style={styles.buttonText}>Generar Chamuyo</Text>
          </TouchableOpacity>

          {respuestaChamuyo !== "" && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{respuestaChamuyo}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff69b4",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    width: "100%",
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#222",
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff69b4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    color: "#ffd700",
    marginBottom: 5,
    textAlign: "center",
  },
});
