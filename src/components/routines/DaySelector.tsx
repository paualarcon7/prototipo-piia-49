
import React from 'react';
import { View, Text } from 'react-native';
import { WeekDay } from '@/types/rutina';

interface DaySelectorProps {
  selectedDays: WeekDay[];
  onToggle: (day: WeekDay) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDays,
  onToggle
}) => {
  return (
    <View>
      <Text>Day Selector (Native Implementation Pending)</Text>
    </View>
  );
};

export default DaySelector;
