import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import HomeTabs from './HomeTabs';
// import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    checkToken();
  }, []);

  const handleLogin = async (newToken) => {
    await AsyncStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeTabs} />
            {/* <Stack.Screen name="Map" component={MapScreen} /> */}
          </>
        )}
      </Stack.Navigator>
  );
}
