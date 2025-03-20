
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface EmptyRoutinesStateProps {
  onCreateRoutine: () => void;
}

const EmptyRoutinesState: React.FC<EmptyRoutinesStateProps> = ({ onCreateRoutine }) => {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 20 
    }}>
      <Text style={{ 
        color: '#fff', 
        fontSize: 18, 
        textAlign: 'center', 
        marginBottom: 20 
      }}>
        No tienes rutinas activas
      </Text>
      <TouchableOpacity 
        onPress={onCreateRoutine}
        style={{
          backgroundColor: '#02b1bb',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Crear nueva rutina
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyRoutinesState;
