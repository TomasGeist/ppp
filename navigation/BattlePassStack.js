import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BattlePass from '../screens/BattlePass';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator();

export default function BattlePassStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BattlePassMain" component={BattlePass} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
    </Stack.Navigator>
  );
}