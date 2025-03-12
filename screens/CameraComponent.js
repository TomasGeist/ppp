import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function CameraComponent() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  // Mientras se cargan los permisos, renderizamos una vista vacía
  if (!permission) {
    return <View />;
  }

  // Si el usuario no ha concedido permisos, mostramos un mensaje y un botón para solicitarlos
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Se requieren permisos para acceder a la cámara
        </Text>
        <Button title="Solicitar permiso" onPress={requestPermission} />
      </View>
    );
  }

  // Función para cambiar entre cámara trasera y frontal
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Cambiar cámara</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#00000080',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});