
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Routine } from '@/types/rutina';

interface RoutineCardProps {
  routine: Routine;
  onPress: (id: string) => void;
}

const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(routine.id)}>
      <View style={{ 
        padding: 16, 
        borderRadius: 8, 
        backgroundColor: 'rgba(30,30,40,0.6)',
        marginBottom: 12
      }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>{routine.name}</Text>
        <Text style={{ color: '#ccc', marginTop: 4 }}>
          {routine.time.start} - {routine.time.end}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {routine.days.map(day => (
            <Text key={day} style={{ color: '#02b1bb', marginRight: 8 }}>{day}</Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RoutineCard;
