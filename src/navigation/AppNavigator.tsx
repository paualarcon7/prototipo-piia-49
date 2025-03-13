
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import ProgramaDetalleScreen from '../screens/ProgramaDetalleScreen';

// Define our navigation types
type RootStackParamList = {
  Home: undefined;
  ProgramaDetalle: { id: string };
  ModuloDetalle: { id: string; moduleId: string };
};

// Create our navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Main stack navigator
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#121212' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProgramaDetalle" component={ProgramaDetalleScreen} />
      <Stack.Screen name="ModuloDetalle" component={ModuloDetalleScreen} />
    </Stack.Navigator>
  );
};

// Placeholder components for now
const HomeScreen = () => <></>;
const ModuloDetalleScreen = () => <></>;

// Export the navigation container
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
