
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-dom';

const Rutinas = () => {
  const navigate = useNavigate();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#121212' }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Mis Rutinas
      </Text>
      
      <TouchableOpacity
        onPress={() => navigate('/rutinas/nueva')}
        style={{
          backgroundColor: '#02b1bb',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 16
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Crear nueva rutina
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Rutinas;
