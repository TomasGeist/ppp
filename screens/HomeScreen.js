import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({navigation}) {
  const handleRandomEvent = () => {
    navigation.navigate('Map');
  };



  return (
    <ImageBackground
      source={{ uri: "https://example.com/disco-bg.jpg" }} // Reemplaza con una imagen de fondo adecuada
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>BOLICHE.AR</Text>
        <Text style={styles.subtitle}>
          ¿A dónde salimos hoy? 🎉🍸
        </Text>

        {/* Cuenta regresiva */}
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>
            🔥 Próximo evento en: 02h 15m
          </Text>
        </View>

        {/* Eventos recomendados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎶 Eventos Recomendados</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.card}>
              <Ionicons name="musical-notes" size={40} color="#ff69b4" />
              <Text style={styles.cardText}>Noche Electrónica</Text>
            </View>
            <View style={styles.card}>
              <Ionicons name="beer" size={40} color="#ff69b4" />
              <Text style={styles.cardText}>Fiesta de la Cerveza</Text>
            </View>
            <View style={styles.card}>
              <Ionicons name="flame" size={40} color="#ff69b4" />
              <Text style={styles.cardText}>Reggaeton Night</Text>
            </View>
          </ScrollView>
        </View>

        {/* Promos y Descuentos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🍸 Promos y Descuentos</Text>
          <View style={styles.promoContainer}>
            <Ionicons name="wine" size={30} color="#ffd700" />
            <Text style={styles.promoText}>2x1 en tragos hasta las 00:00</Text>
          </View>
          <View style={styles.promoContainer}>
            <Ionicons name="ticket" size={30} color="#ffd700" />
            <Text style={styles.promoText}>Entrada gratis hasta las 23:00</Text>
          </View>
        </View>

        {/* Pase de batalla */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Pase de Batalla</Text>
          <TouchableOpacity
            style={styles.battlePassButton}
            onPress={() => Alert.alert("Pase de Batalla", "¡Suma puntos y desbloquea premios!")}
          >
            <Text style={styles.battlePassText}>Ver mi progreso</Text>
          </TouchableOpacity>
        </View>

        {/* Botón "¿A dónde salimos hoy?" */}
        <View style={styles.container}>
      <TouchableOpacity style={styles.randomButton} onPress={handleRandomEvent}>
        <Ionicons name="sparkles" size={30} color="#fff" />
        <Text style={styles.randomButtonText}>¿A dónde salimos hoy?</Text>
      </TouchableOpacity>
    </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#ff69b4",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
  },
  countdownContainer: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 16,
    color: "#ffd700",
    fontWeight: "bold",
  },
  section: {
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#ff69b4",
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 15,
    width: 120,
    alignItems: "center",
    marginRight: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  promoText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
  },
  battlePassButton: {
    backgroundColor: "#ff69b4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  battlePassText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  randomButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffd700",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  randomButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
