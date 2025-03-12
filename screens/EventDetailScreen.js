// screens/EventDetailScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';

export default function EventDetailScreen({ route, navigation }) {
  const { event } = route.params;
  const [quantity, setQuantity] = useState(1);

  // Función para renderizar estrellas de valoración
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={`full-${i}`} name="star" size={20} color="#ffd700" style={styles.star} />
      );
    }
    if (halfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={20} color="#ffd700" style={styles.star} />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={20} color="#ffd700" style={styles.star} />
      );
    }
    return stars;
  };

  const handleBuy = () => {
    WebBrowser.openBrowserAsync(`https://fiestago.com.ar/mp_preferencias/?id_evento=${event.id}&quantity=${quantity}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {event.image && (
        <Image source={{ uri: event.image }} style={styles.eventImage} resizeMode="cover" />
      )}

      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.details}>{event.details}</Text>
      {event.description && (
        <Text style={styles.description}>{event.description}</Text>
      )}
      {event.emoji && (
        <Text style={styles.emoji}>{event.emoji}</Text>
      )}

      {/* Selector de cantidad personalizado */}
      <View style={styles.quantitySelector}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}
        >
          <Ionicons name="remove" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity((prev) => prev + 1)}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Botón de compra estilizado */}
      <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

      {/* Sección Artistas */}
      {event.artist && Array.isArray(event.artist) ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Artistas Invitados</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
          >
            {event.artist.map((artist, index) => (
              <View key={index} style={styles.artistCard}>
                {artist.image && (
                  <Image source={{ uri: artist.image }} style={styles.artistImage} />
                )}
                <Text style={styles.artistName}>{artist.name}</Text>
                {artist.bio && (
                  <Text style={styles.artistBio}>{artist.bio}</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        event.artist && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Artista Invitado</Text>
            <View style={styles.artistContainer}>
              {event.artist.image && (
                <Image source={{ uri: event.artist.image }} style={styles.artistImage} />
              )}
              <View style={styles.artistDetails}>
                <Text style={styles.artistName}>{event.artist.name}</Text>
                {event.artist.bio && (
                  <Text style={styles.artistBio}>{event.artist.bio}</Text>
                )}
              </View>
            </View>
          </View>
        )
      )}

      {/* Sección Asistentes */}
      {event.attendees && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asistentes</Text>
          <View style={styles.attendeesContainer}>
            {event.attendees.slice(0, 4).map((attendee) => (
              <Image
                key={attendee.foto}
                source={{ uri: attendee.foto }}
                style={styles.attendeeImage}
              />
            ))}
            {event.extraAttendees > 0 && (
              <View style={styles.extraAttendees}>
                <Text style={styles.extraText}>+{event.extraAttendees}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Sección Valoración */}
      {typeof event.rating === 'number' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Valoración</Text>
          <View style={styles.ratingContainer}>
            {renderStars(event.rating)}
            <Text style={styles.ratingText}>{event.rating} / 5</Text>
          </View>
        </View>
      )}

      {/* Sección Carta de Tragos */}
      {event.drinks && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Carta de Tragos</Text>
          {event.drinks.map((drink) => (
            <View key={drink.id} style={styles.drinkCard}>
              <Text style={styles.drinkName}>{drink.name}</Text>
              {drink.description && (
                <Text style={styles.drinkDescription}>{drink.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    marginBottom: 10,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    color: '#ff69b4',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  quantityButton: {
    backgroundColor: '#ff69b4',
    padding: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  quantityValue: {
    marginHorizontal: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#ff69b4',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#ff69b4',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    paddingHorizontal: 10,
  },
  artistCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 5,
    marginRight: 15,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  artistDetails: {
    flex: 1,
  },
  artistName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artistBio: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  extraAttendees: {
    backgroundColor: '#333',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraText: {
    color: '#fff',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
  },
  star: {
    marginRight: 2,
  },
  drinkCard: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  drinkName: {
    fontSize: 18,
    color: '#ff69b4',
    fontWeight: 'bold',
  },
  drinkDescription: {
    fontSize: 16,
    color: '#ddd',
  },
});
