
import React from 'react';
import { View, Text } from 'react-native';

interface RoutineTimeSelectorProps {
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
}

const RoutineTimeSelector: React.FC<RoutineTimeSelectorProps> = ({
  startTime,
  endTime,
  setStartTime,
  setEndTime
}) => {
  return (
    <View>
      <Text>Time Selector (Native Implementation Pending)</Text>
    </View>
  );
};

export default RoutineTimeSelector;
