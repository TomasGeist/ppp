import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const levels = [
  { level: 1, pointsRequired: 100, reward: "10% Descuento en entradas", icon: "ticket-outline" },
  { level: 2, pointsRequired: 250, reward: "Shot gratis", icon: "wine-outline" },
  { level: 3, pointsRequired: 500, reward: "Entrada VIP", icon: "diamond-outline" },
  { level: 4, pointsRequired: 800, reward: "2 tragos gratis", icon: "beer-outline" },
  { level: 5, pointsRequired: 1200, reward: "Entrada gratis + zona VIP", icon: "star-outline" },
];

const currentPoints = 600; // Simulación de puntos del usuario

const LevelItem = ({ item, userPoints, onClaim }) => {
  const progress = Math.min(userPoints / item.pointsRequired, 1);
  const canClaim = userPoints >= item.pointsRequired;
  
  return (
    <View style={styles.levelContainer}>
      <Ionicons name={item.icon} size={30} color="#ff69b4" />
      <View style={styles.textContainer}>
        <Text style={styles.levelText}>Nivel {item.level}</Text>
        <Text style={styles.rewardText}>{item.reward}</Text>
        <Progress.Bar 
          progress={progress} 
          width={null} 
          color={progress >= 1 ? "#32CD32" : "#ffd700"} 
          style={styles.progressBar} 
        />
      </View>
      <View style={styles.actionsContainer}>
        <Text style={[styles.pointsText, progress >= 1 && { color: "#32CD32" }]}>
          {item.pointsRequired} pts
        </Text>
        {canClaim && (
          <TouchableOpacity style={styles.claimButton} onPress={() => onClaim(item.reward)}>
            <Text style={styles.claimButtonText}>Reclamar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function BattlePass({ navigation }) {

  const handleClaim = (reward) => {
    navigation.navigate("SuccessScreen", { reward });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎟️ Pase de Batalla 🎟️</Text>
      <Text style={styles.subtitle}>Acumula puntos y desbloquea premios</Text>
      <FlatList
        data={levels}
        keyExtractor={(item) => item.level.toString()}
        renderItem={({ item }) => (
          <LevelItem item={item} userPoints={currentPoints} onClaim={handleClaim} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ff69b4",
    textAlign: "center",
    marginBottom: 20,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffd700",
  },
  rewardText: {
    fontSize: 14,
    color: "#fff",
  },
  progressBar: {
    marginTop: 5,
    marginRight: 12,
    maxWidth: 180,
    padding: 2
  },
  actionsContainer: {
    alignItems: "center",
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff69b4",
    marginBottom: 5,
  },
  claimButton: {
    backgroundColor: "#32CD32",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  claimButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
