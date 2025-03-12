// navigation/HomeTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Chamuyometro from '../screens/Chamuyometro';
import BattlePassStackScreen from './BattlePassStack';
import PartyStackScreen from './PartyStack';
import QrScanner from '../screens/QrScanner';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === 'Fiesta') {
            return <MaterialCommunityIcons name="party-popper" size={size} color={color} />;
          } else if (route.name === 'BattlePass') {
            return <Ionicons name="ticket" size={size} color={color} />;
          } else if (route.name === 'QrScanner') {
            return <Ionicons name="qr-code-outline" size={size} color={color} />;
          } else if (route.name === 'Perfil') {
            return <Ionicons name="person" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#ff69b4',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#1a1a1a', borderTopColor: '#444' },
        headerStyle: { backgroundColor: '#1a1a1a' },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Fiesta" component={PartyStackScreen} options={{ title: 'Fiesta' }} />
      <Tab.Screen name="BattlePass" component={BattlePassStackScreen} options={{ title: 'Pase de Batalla' }} />
      <Tab.Screen name="QrScanner" component={QrScanner} options={{ title: 'Tickets' }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
