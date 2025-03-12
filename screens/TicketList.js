// components/TicketList.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import QrScanner from './TicketCard';

const TicketList = () => {
  // Categorías para filtrar (pueden adaptarse a tus necesidades)
  const categories = ["Todos", "VIP", "General"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Datos de ejemplo para tickets
  const tickets = [
    { id: "1", qrValue: "https://example.com/ticket/1", category: "VIP" },
    { id: "2", qrValue: "https://example.com/ticket/2", category: "General" },
    { id: "3", qrValue: "https://example.com/ticket/3", category: "VIP" },
    { id: "4", qrValue: "https://example.com/ticket/4", category: "General" },
    { id: "5", qrValue: "https://example.com/ticket/5", category: "General" },
    { id: "6", qrValue: "https://example.com/ticket/6", category: "VIP" },
  ];

  // Filtrado de tickets según la categoría seleccionada
  const filteredTickets =
    selectedCategory === "Todos"
      ? tickets
      : tickets.filter((ticket) => ticket.category === selectedCategory);

  // Datos por defecto para detalles del evento (puedes actualizarlos según corresponda)
  const eventDetail = {
    title: "Fiesta de Verano",
    details: "Disfruta de la mejor música y ambiente",
    description: "Una noche inolvidable en la ciudad",
  };

  return (
    <View style={styles.container}>
      {/* Barra de filtros */}
      <View style={styles.filterContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              selectedCategory === cat && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === cat && styles.filterTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de tickets */}
      <FlatList
        data={filteredTickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QrScanner ticket={item} eventDetail={eventDetail} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  filterButtonActive: {
    backgroundColor: '#ff69b4',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default TicketList;
