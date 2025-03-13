
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Navigation type
type RootStackParamList = {
  ProgramaDetalle: { id: string };
  ModuloDetalle: { id: string; moduleId: string };
};

type ModuloDetalleNavigationProp = StackNavigationProp<RootStackParamList, 'ModuloDetalle'>;

interface Stage {
  id: string;
  title: string;
  icon: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

const ModuloDetalleScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<ModuloDetalleNavigationProp>();
  const { id, moduleId } = route.params as { id: string; moduleId: string };
  
  // Mock module data
  const moduleName = "Transformación Profunda";
  const moduleDescription = "Implementa cambios duraderos en tu vida";
  
  // Mock stages data
  const stages: Stage[] = [
    {
      id: "inicio",
      title: "Inicio",
      icon: "play-circle",
      description: "Escucha el audio introductorio y reflexiona sobre los conceptos presentados.",
      completed: true
    },
    {
      id: "trabajo",
      title: "Sesión de trabajo",
      icon: "clipboard",
      description: "Aprende sobre el protocolo y realiza ejercicios prácticos.",
      completed: false,
      current: true
    },
    {
      id: "entrenamiento",
      title: "Entrenamiento",
      icon: "barbell",
      description: "Practica los ejercicios y técnicas enseñadas en tu día a día.",
      completed: false
    },
    {
      id: "feedback",
      title: "Feedback",
      icon: "chatbubbles",
      description: "Evalúa tu progreso y comparte tu experiencia con el protocolo.",
      completed: false
    }
  ];

  const handleStagePress = (stage: Stage) => {
    if (!stage.completed && !stage.current) {
      alert("Esta etapa aún no está disponible");
      return;
    }
    
    // Here you would navigate to the corresponding stage screen
    alert(`Navegando a la etapa: ${stage.title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Volver al programa</Text>
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.moduleTitle}>Módulo {moduleId}: {moduleName}</Text>
          <Text style={styles.moduleDescription}>{moduleDescription}</Text>
          
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Progreso del módulo</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '25%' }]} />
            </View>
            <Text style={styles.progressPercentage}>25%</Text>
          </View>
        </View>

        <View style={styles.stagesContainer}>
          <Text style={styles.sectionTitle}>Etapas del módulo</Text>
          
          {stages.map((stage, index) => (
            <TouchableOpacity
              key={stage.id}
              style={[
                styles.stageCard,
                stage.current ? styles.currentStageCard : {},
                !stage.completed && !stage.current ? styles.lockedStageCard : {}
              ]}
              onPress={() => handleStagePress(stage)}
              disabled={!stage.completed && !stage.current}
            >
              <LinearGradient
                colors={stage.current ? ['#FF4081', '#C23A3A'] : ['#3a3a3a', '#242424']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.stageGradient}
              >
                <View style={styles.stageHeader}>
                  <Ionicons name={stage.icon as any} size={24} color={stage.current ? "#fff" : "#02b1bb"} />
                  <View style={styles.stageTitleContainer}>
                    <Text style={styles.stageTitle}>{stage.title}</Text>
                    {stage.completed ? (
                      <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.stageIcon} />
                    ) : !stage.current && (
                      <Ionicons name="lock-closed" size={16} color="#9e9e9e" style={styles.stageIcon} />
                    )}
                  </View>
                </View>
                <Text style={styles.stageDescription}>{stage.description}</Text>
                
                {stage.current && (
                  <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continuar</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </TouchableOpacity>
                )}
              </LinearGradient>
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  backButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  headerContainer: {
    backgroundColor: 'rgba(60, 60, 70, 0.5)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#bdbdbd',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(60, 60, 70, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF4081',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    color: '#FF4081',
    alignSelf: 'flex-end',
  },
  stagesContainer: {
    backgroundColor: 'rgba(60, 60, 70, 0.5)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  stageCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  currentStageCard: {
    elevation: 4,
    shadowColor: '#FF4081',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  lockedStageCard: {
    opacity: 0.5,
  },
  stageGradient: {
    padding: 16,
  },
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  stageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  stageIcon: {
    marginLeft: 4,
  },
  stageDescription: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 16,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  continueButtonText: {
    color: '#fff',
    marginRight: 8,
    fontWeight: '500',
  },
});

export default ModuloDetalleScreen;
