// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Agregar AsyncStorage para cerrar sesión

export default function ProfileScreen({ navigation }) {
  const rating = 4.5;
  const friendsCount = 250;
  const eventsAttended = 15;
  const accountType = 'Premium'; // O 'Gratuita'
  const level = 25; // Nivel de la cuenta

  const handleFriendsPress = () => {
    Alert.alert('Amigos', 'Mostrando lista de amigos...');
  };

  const handleEventsPress = () => {
    Alert.alert('Eventos', 'Mostrando eventos asistidos...');
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={`full-${i}`} name="star" size={20} color="#ffd700" />);
    }
    if (halfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={20} color="#ffd700" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={20} color="#ffd700" />);
    }
    return stars;
  };

  const handleLogout = async () => {
    try {
      // Eliminar el token de AsyncStorage
      await AsyncStorage.removeItem('token');
      Alert.alert('Éxito', 'Has cerrado sesión correctamente');
      
      // Redirigir a la pantalla de login
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al cerrar sesión');
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Ionicons name="person-circle" size={100} color="#ff69b4" />
        <Text style={styles.level}>({level})</Text>
      </View>
      <Text style={styles.name}>Tomás Geist</Text>
      <Text style={styles.email}>usuario@boliche.ar</Text>
      <Text style={styles.description}>
        A la mañana me dicen dev pero vos decime como quieras 😎🎉
      </Text>

      {/* Sección de estadísticas e interactividad */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Valoración</Text>
          <View style={styles.ratingContainer}>
            {renderStars()}
            <Text style={styles.statValue}>{rating} / 5</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.statItem} onPress={handleFriendsPress}>
          <Text style={styles.statLabel}>Amigos</Text>
          <View style={styles.statValueContainer}>
            <Ionicons name="people" size={20} color="#fff" />
            <Text style={styles.statValue}> {friendsCount}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem} onPress={handleEventsPress}>
          <Text style={styles.statLabel}>Eventos Asistidos</Text>
          <View style={styles.statValueContainer}>
            <Ionicons name="calendar" size={20} color="#fff" />
            <Text style={styles.statValue}> {eventsAttended}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Tipo de Cuenta</Text>
          <View style={styles.statValueContainer}>
            <Ionicons name="star" size={20} color={accountType === 'Premium' ? '#ffd700' : '#ccc'} />
            <Text style={styles.statValue}> {accountType}</Text>
          </View>
        </View>
      </View>

      {/* Botón de cierre de sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  level: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  name: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
  },
  email: {
    fontSize: 18,
    color: '#ddd',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  statsContainer: {
    marginTop: 30,
    width: '100%',
  },
  statItem: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#ff69b4',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  logoutButton: {
    backgroundColor: '#ff69b4',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#0d0d0d',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
