import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Prueba con la importación por defecto:
import Camera from 'expo-camera';

export default function CameraScreen() {
  const [permission, setPermission] = useState(null);
  const [facing, setFacing] = useState('back');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setPermission({ status });
    })();
  }, []);

  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermission({ status });
  };

  if (!permission) {
    return <View />;
  }

  if (permission.status !== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Se requieren permisos para acceder a la cámara.
        </Text>
        <Button title="Solicitar permiso" onPress={requestPermission} />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Cambiar cámara</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  message: { textAlign: 'center', margin: 20, fontSize: 16 },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  button: { padding: 10, backgroundColor: '#00000080', borderRadius: 5 },
  text: { fontSize: 18, color: 'white' },
});
