import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import RatesScreen from '../screens/RatesScreen';
import RequirementsScreen from '../screens/RequirementsScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import LocationScreen from '../screens/LocationScreen';

export type RootStackParamList = {
  Home: undefined;
  Services: { bankId: string };
  Rates: { bankId: string };
  Requirements: { bankId: string };
  Calculator: { bankId: string };
  Location: { bankId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Bancos del Ecuador' }}
      />
      <Stack.Screen 
        name="Services" 
        component={ServicesScreen} 
        options={{ title: 'Servicios' }}
      />
      <Stack.Screen 
        name="Rates" 
        component={RatesScreen} 
        options={{ title: 'Tasas de Interés' }}
      />
      <Stack.Screen 
        name="Requirements" 
        component={RequirementsScreen} 
        options={{ title: 'Requisitos' }}
      />
      <Stack.Screen 
        name="Calculator" 
        component={CalculatorScreen} 
        options={{ title: 'Calculadora' }}
      />
      <Stack.Screen 
        name="Location" 
        component={LocationScreen} 
        options={{ title: 'Ubicaciones' }}
      />
    </Stack.Navigator>
  );
}
