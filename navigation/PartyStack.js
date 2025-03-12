// navigation/BattlePassStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PartyScreen from '../screens/PartyScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

const Stack = createStackNavigator();

export default function PartyStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PartyMain" component={PartyScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    </Stack.Navigator>
  );
}
