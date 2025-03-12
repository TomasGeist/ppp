// navigation/BattlePassStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BattlePass from '../screens/BattlePass';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createStackNavigator();

export default function BattlePassStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BattlePassMain" component={BattlePass} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
    </Stack.Navigator>
  );
}
