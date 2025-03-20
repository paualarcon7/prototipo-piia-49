
import React from 'react';
import { View, Text } from 'react-native';
import { WeekDay } from '@/types/rutina';

interface CalendarPreviewProps {
  routineName: string;
  startTime: string;
  endTime: string;
  days: WeekDay[];
}

const CalendarPreview: React.FC<CalendarPreviewProps> = ({
  routineName,
  startTime,
  endTime,
  days
}) => {
  return (
    <View>
      <Text>Calendar Preview (Native Implementation Pending)</Text>
    </View>
  );
};

export default CalendarPreview;
