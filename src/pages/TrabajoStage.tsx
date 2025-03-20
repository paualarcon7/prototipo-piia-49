
import React from 'react';
import { View, Text } from 'react-native';
import { useParams } from 'react-router-dom';

const TrabajoStage = () => {
  const { id, moduleId } = useParams();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#121212' }}>
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
        Etapa de Trabajo
      </Text>
      <Text style={{ color: '#ccc', marginTop: 8 }}>
        Programa ID: {id}, Módulo ID: {moduleId}
      </Text>
    </View>
  );
};

export default TrabajoStage;
