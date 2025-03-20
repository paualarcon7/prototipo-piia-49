
import React from 'react';
import { View, Text } from 'react-native';

interface CalendarPreviewProps {
  routineName: string;
  startTime: string;
  endTime: string;
  selectedDays: string[];
}

const CalendarPreview: React.FC<CalendarPreviewProps> = ({
  routineName,
  startTime,
  endTime,
  selectedDays
}) => {
  return (
    <View>
      <Text>Calendar Preview (Native Implementation Pending)</Text>
    </View>
  );
};

export default CalendarPreview;
