
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import ProgramaDetalleScreen from '../screens/ProgramaDetalleScreen';
import ModuloDetalleScreen from '../screens/ModuloDetalleScreen';

// Define our navigation types
export type RootStackParamList = {
  TabNavigator: undefined;
  ProgramaDetalle: { id: string };
  ModuloDetalle: { id: string; moduleId: string };
};

export type TabParamList = {
  Home: undefined;
  Chatbot: undefined;
};

// Create our navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Tab navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      id="TabNavigator"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chatbot') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: '#121212', borderTopColor: '#333' },
        tabBarActiveTintColor: '#FF4081',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
    </Tab.Navigator>
  );
};

// Main stack navigator
const AppStack = () => {
  return (
    <Stack.Navigator
      id="AppStack"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#121212' },
      }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="ProgramaDetalle" component={ProgramaDetalleScreen} />
      <Stack.Screen name="ModuloDetalle" component={ModuloDetalleScreen} />
    </Stack.Navigator>
  );
};

// Export the navigation container
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
