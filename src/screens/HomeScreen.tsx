
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define navigation types
type RootStackParamList = {
  Home: undefined;
  ProgramaDetalle: { id: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const streak = {
    current: 1,
    best: 1
  };
  const activePrograms = [{
    id: 1,
    name: "Elementia",
    description: "Programa para que alcances tu máximo potencial a través de las metodologías del alto rendimiento",
    progress: 100,
    color: {
      from: "#02b1bb",
      to: "#003438"
    },
    status: "completed"
  }, {
    id: 2,
    name: "Elementia 2",
    description: "Descubre tu poder interior y desarrolla habilidades extraordinarias para el éxito",
    progress: 35,
    color: {
      from: "#FF4081",
      to: "#C23A3A"
    },
    status: "in-progress"
  }, {
    id: 3,
    name: "Elementia 3",
    description: "Transforma tu mentalidad y alcanza nuevos niveles de excelencia personal",
    progress: 0,
    color: {
      from: "#8E9196",
      to: "#333333"
    },
    status: "blocked"
  }];
  const days = [{
    name: "Vie",
    completed: false
  }, {
    name: "Sáb",
    completed: false
  }, {
    name: "Dom",
    completed: false
  }, {
    name: "Lun",
    completed: true
  }, {
    name: "Mar",
    completed: false
  }, {
    name: "Ayer",
    completed: false
  }, {
    name: "Hoy",
    completed: false
  }];

  // Find current work day
  const currentDay = {
    day: 3,
    title: "Elementos de la mente",
    description: "Descubre cómo funciona tu mente y aprende a controlarla",
    status: 'current'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Bienvenido de vuelta</Text>
        
        {/* Current Work Day Card */}
        {currentDay && (
          <View style={styles.currentDayCard}>
            <View style={styles.currentDayContent}>
              <View>
                <Text style={styles.currentDayTitle}>Tu entrenamiento de hoy</Text>
                <Text style={styles.currentDaySubtitle}>Día {currentDay.day}: {currentDay.title}</Text>
                <Text style={styles.currentDayDescription}>{currentDay.description}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => navigation.navigate('ProgramaDetalle', { id: '2' })}
            >
              <Text style={styles.startButtonText}>Comenzar actividades del día</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        )}
        
        {/* Streak Card */}
        <View style={styles.streakCard}>
          {/* Days of the week */}
          <View style={styles.daysContainer}>
            {days.map((day, index) => (
              <View key={index} style={styles.dayItem}>
                <View style={[
                  styles.dayCircle,
                  day.completed ? styles.completedDayCircle : styles.incompleteDayCircle
                ]}>
                  {day.completed && (
                    <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  )}
                </View>
                <Text style={styles.dayText}>{day.name}</Text>
              </View>
            ))}
          </View>

          {/* Streak Stats */}
          <View style={styles.streakStats}>
            <View style={styles.streakItem}>
              <Text style={styles.streakText}>Mi racha actual</Text>
              <Ionicons name="flame" size={24} color="#FFA500" />
              <Text style={styles.streakCount}>x{streak.current}</Text>
            </View>
            <View style={styles.streakItem}>
              <Text style={styles.streakText}>Mi mejor racha</Text>
              <Ionicons name="flame" size={24} color="#FFD700" />
              <Text style={styles.streakCount}>x{streak.best}</Text>
            </View>
          </View>
        </View>

        {/* Active Programs Section */}
        <Text style={styles.sectionTitle}>Programas Activos</Text>
        <View style={styles.programsContainer}>
          {activePrograms.map(program => (
            <TouchableOpacity
              key={program.id}
              style={[
                styles.programCard,
                program.status === 'blocked' ? { opacity: 0.75 } : {}
              ]}
              onPress={() => {
                if (program.status !== 'blocked') {
                  navigation.navigate('ProgramaDetalle', { id: program.id.toString() });
                }
              }}
              disabled={program.status === 'blocked'}
            >
              <LinearGradient
                colors={[program.color.from, program.color.to]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.programHeader}
              >
                <View style={styles.programTitleContainer}>
                  <Text style={styles.programTitle}>{program.name}</Text>
                  {program.status === 'completed' && (
                    <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  )}
                  {program.status === 'blocked' && (
                    <Ionicons name="lock-closed" size={20} color="#fff" />
                  )}
                </View>
                <Text style={styles.programDescription}>{program.description}</Text>
              </LinearGradient>
              <View style={styles.programContent}>
                <View style={styles.progressContainer}>
                  <View style={styles.progressTextContainer}>
                    <Text style={styles.progressLabel}>Progreso</Text>
                    <Text style={styles.progressValue}>{program.progress}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        {
                          width: `${program.progress}%`,
                          backgroundColor: program.color.from,
                          opacity: program.status === 'blocked' ? 0.5 : 1
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  currentDayCard: {
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  currentDayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  currentDayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  currentDaySubtitle: {
    fontSize: 14,
    color: '#d1d1d1',
    marginBottom: 8,
  },
  currentDayDescription: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  startButton: {
    backgroundColor: '#FF4081',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  streakCard: {
    backgroundColor: '#221F26',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  dayItem: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 2,
  },
  completedDayCircle: {
    backgroundColor: '#FF4081',
    borderColor: '#FF4081',
  },
  incompleteDayCircle: {
    borderColor: '#606060',
    borderStyle: 'dashed',
  },
  dayText: {
    fontSize: 12,
    color: '#fff',
  },
  streakStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  streakItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 8,
  },
  streakCount: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  programsContainer: {
    marginBottom: 32,
  },
  programCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#1A1A1A',
  },
  programHeader: {
    padding: 16,
  },
  programTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  programDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  programContent: {
    padding: 16,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#bdbdbd',
  },
  progressValue: {
    fontSize: 14,
    color: '#bdbdbd',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default HomeScreen;
