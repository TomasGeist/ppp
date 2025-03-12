// components/TicketCard.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  PanResponder,
  Dimensions,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

const QrScanner = ({ ticket, eventDetail }) => {
  // Datos por defecto para pruebas (hardcodeados)
  const defaultTicket = {
    qrValue: "https://example.com/ticket/12345",
    id: "12345",
  };
  const defaultEventDetail = {
    title: "Fiesta de Verano",
    details: "Disfruta de la mejor música y ambiente",
    description: "Una noche inolvidable en la ciudad",
  };

  // Se utilizan los datos recibidos o los por defecto
  const actualTicket = ticket || defaultTicket;
  const actualEventDetail = eventDetail || defaultEventDetail;

  const [flipped, setFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Función para animar el flip con duración más rápida (400ms)
  const flipCard = () => {
    Animated.timing(animatedValue, {
      toValue: flipped ? 0 : 180,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setFlipped(!flipped));
  };

  // Estilos de animación para cada lado
  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  // PanResponder para detectar deslizamientos horizontales y activar el flip
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        Math.abs(gestureState.dx) > 20,
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > 50) {
          flipCard();
        }
      },
    })
  ).current;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={flipCard}
      {...panResponder.panHandlers}
    >
      <View style={styles.container}>
        {/* Lado frontal: Detalles del Evento */}
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>{actualEventDetail.title}</Text>
            <Text style={styles.details}>{actualEventDetail.details}</Text>
            {actualEventDetail.description && (
              <Text style={styles.description}>{actualEventDetail.description}</Text>
            )}
          </View>
        </Animated.View>

        {/* Lado trasero: Código QR */}
        <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
          <View style={styles.cardContent}>
            <QRCode
              value={actualTicket.qrValue}
              size={150}
              backgroundColor="#1a1a1a"
              color="#ff69b4"
            />
            <Text style={styles.ticketInfo}>Ticket ID: {actualTicket.id}</Text>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 250,
    alignSelf: 'center',
    marginVertical: 20,
    perspective: 1000, // Necesario para el efecto 3D
  },
  flipCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ff69b4',
  },
  flipCardBack: {
    backgroundColor: '#1a1a1a',
    position: 'absolute',
    top: 0,
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ff69b4',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  ticketInfo: {
    fontSize: 16,
    color: '#fff',
    marginTop: 15,
  },
});

export default QrScanner;
