import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


export default function PartyScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 3;

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://fiestago.com.ar/ws_get_eventos/?page=${page}&limit=${limit}`);
      const data = await response.json();
      const newEvents = data.eventos || [];
      setEvents(newEvents);
      setHasMore(newEvents.length === limit);
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [page])
  );

  const handleNextPage = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1 && !loading) {
      setPage(prev => prev - 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetail', { event: item })}
    >
      {/* Notches laterales para simular ticket */}
      <View style={styles.notchLeft} />
      <View style={styles.notchRight} />

      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDetails}>{item.details}</Text>
      <Text style={styles.eventEmoji}>{item.emoji}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Próximos Eventos</Text>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      )}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.pageButton, page === 1 && styles.disabledButton]}
          onPress={handlePrevPage}
          disabled={page === 1 || loading}
        >
          <Text style={styles.pageButtonText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>Página {page}</Text>
        <TouchableOpacity
          style={[styles.pageButton, !hasMore && styles.disabledButton]}
          onPress={handleNextPage}
          disabled={!hasMore || loading}
        >
          <Text style={styles.pageButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#ff69b4',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#333',
    padding: 30,
    borderRadius: 15,
    width: '100%',
    marginBottom: 15,
    position: 'relative',
    overflow: 'hidden',
  },
  // Notches laterales para el efecto ticket
  notchLeft: {
    position: 'absolute',
    left: -15,
    top: '50%',
    width: 30,
    height: 30,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    transform: [{ translateY: -15 }],
  },
  notchRight: {
    position: 'absolute',
    right: -15,
    top: '50%',
    width: 30,
    height: 30,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    transform: [{ translateY: -15 }],
  },
  eventTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  eventDetails: {
    fontSize: 16,
    color: '#ddd',
    marginVertical: 5,
  },
  eventEmoji: {
    fontSize: 24,
    textAlign: 'right',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageButton: {
    backgroundColor: '#ff69b4',
    padding: 10,
    borderRadius: 5,
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#888',
  },
  pageText: {
    color: '#fff',
    fontSize: 16,
  },
});
