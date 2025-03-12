import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sexo, setSexo] = useState('M');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingrese correo y contraseña.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://fiestago.com.ar/ws_login_app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (data.estado === 'ok') {
        await AsyncStorage.setItem('token', data.token);
        onLogin(data.token);
      } else {
        Alert.alert('Error', data.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !nombre || !apellido || !telefono) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://fiestago.com.ar/ws_register_app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: email,
          password: password,
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          email: email,
          sexo: sexo,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (data.estado === 'ok') {
        Alert.alert('Éxito', 'Registro exitoso');
        setIsLogin(true);
      } else {
        Alert.alert('Error', data.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> BOLICHE.AR </Text>

      {isLogin ? (
        <>
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#ddd"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#ddd"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading && <ActivityIndicator size="small" color="#fff" />}
            <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLogin(false)}>
            <Text style={styles.footer}>¿No tienes cuenta? Regístrate aquí.</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#ddd"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#ddd"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="person" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#ddd"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="person" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor="#ddd"
              value={apellido}
              onChangeText={setApellido}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="call" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="#ddd"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading && <ActivityIndicator size="small" color="#fff" />}
            <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Registrarse'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(true)}>
            <Text style={styles.footer}>¿Ya tienes cuenta? Ingresa aquí.</Text>
          </TouchableOpacity>
        </>
      )}
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
  title: {
    fontSize: 32,
    color: '#ff69b4',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 40,
  },
  button: {
    backgroundColor: '#ff69b4',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#0d0d0d',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});


