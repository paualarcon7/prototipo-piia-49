
import React from 'react';
import { View, Text } from 'react-native';
import { useParams } from 'react-router-dom';

const RutinaDetalle = () => {
  const { id } = useParams();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#121212' }}>
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
        Detalle de Rutina
      </Text>
      <Text style={{ color: '#ccc', marginTop: 8 }}>
        ID: {id}
      </Text>
    </View>
  );
};

export default RutinaDetalle;
