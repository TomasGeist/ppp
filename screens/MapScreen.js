// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from '@teovilla/react-native-maps'; // Cambia la importación
// import * as Location from 'expo-location';
// import { Ionicons } from '@expo/vector-icons';

// const MapScreen = ({ navigation }) => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [nearbyParties, setNearbyParties] = useState([]);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location.coords);

//       // Simular 3 pines cercanos
//       const parties = [
//         {
//           id: 1,
//           latitude: location.coords.latitude + 0.01,
//           longitude: location.coords.longitude + 0.01,
//           title: 'Fiesta 1',
//         },
//         {
//           id: 2,
//           latitude: location.coords.latitude - 0.01,
//           longitude: location.coords.longitude + 0.02,
//           title: 'Fiesta 2',
//         },
//         {
//           id: 3,
//           latitude: location.coords.latitude + 0.02,
//           longitude: location.coords.longitude - 0.01,
//           title: 'Fiesta 3',
//         },
//       ];
//       setNearbyParties(parties);
//     })();
//   }, []);

//   if (errorMsg) {
//     return (
//       <View style={styles.container}>
//         <Text>{errorMsg}</Text>
//       </View>
//     );
//   }

//   if (!location) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Botón de retroceso personalizado */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="arrow-back" size={30} color="#000" />
//       </TouchableOpacity>

//       {/* Mapa con @teovilla/react-native-maps */}
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: location.latitude,
//           longitude: location.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {/* Marcador para la ubicación actual */}
//         <Marker
//           coordinate={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//           }}
//           title="Tu ubicación"
//         >
//           <Ionicons
//             name="person-circle-sharp"
//             style={styles.iconShadow}
//             size={40}
//             color="black"
//           />
//         </Marker>

//         {/* Marcadores para las fiestas cercanas */}
//         {nearbyParties.map((party) => (
//           <Marker
//             key={party.id}
//             coordinate={{
//               latitude: party.latitude,
//               longitude: party.longitude,
//             }}
//             title={party.title}
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 20,
//     padding: 10,
//   },
//   iconShadow: {
//     textShadowColor: 'rgba(0, 0, 0, 0.5)', // Color de la sombra
//     textShadowOffset: { width: 1, height: 1 }, // Desplazamiento de la sombra
//     textShadowRadius: 3, // Radio de la sombra
//   },
// });

// export default MapScreen;