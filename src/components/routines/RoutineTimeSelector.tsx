
import React from 'react';
import { View, Text } from 'react-native';

interface RoutineTimeSelectorProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  protocols?: { duration: number }[];
}

const RoutineTimeSelector: React.FC<RoutineTimeSelectorProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  protocols
}) => {
  return (
    <View>
      <Text>Time Selector (Native Implementation Pending)</Text>
    </View>
  );
};

export default RoutineTimeSelector;
