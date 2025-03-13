
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define program type
interface Module {
  title: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

interface Program {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  duration: string;
  modules: Module[];
  color: {
    from: string;
    to: string;
  };
}

// Define navigation types
type RootStackParamList = {
  ProgramaDetalle: { id: string };
  ModuloDetalle: { id: string; moduleId: string };
};

type ProgramaDetalleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProgramaDetalle'>;

// Module Stages modal component
const ModuleStages = ({
  isVisible,
  onClose
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [{
    title: "Inicio",
    icon: "play-circle",
    description: "Escucha el audio introductorio y registra tu reflexión mediante una nota de voz.",
    steps: ["Escuchar audio introductorio", "Opción de audio adicional para profundizar", "Grabar reflexión por voz"]
  }, {
    title: "Sesión de trabajo",
    icon: "clipboard",
    description: "Aprende sobre el protocolo, realiza un test y participa en una sesión de Q&A.",
    steps: ["Audio explicativo del protocolo", "Test de 3 preguntas", "Sesión de Q&A (voz o texto)"]
  }, {
    title: "Entrenamiento",
    icon: "barbell",
    description: "Practica los ejercicios y regístralos en tu calendario.",
    steps: ["Acceso al protocolo de ejercicios", "Registro de ejercicios en el calendario", "Seguimiento periódico"]
  }, {
    title: "Feedback",
    icon: "chatbubbles",
    description: "Evalúa tu progreso y comparte tu experiencia con el protocolo.",
    steps: ["Test de evaluación", "Registro de feedback", "Revisión de progreso"]
  }];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Etapas del Módulo</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={stages}
            keyExtractor={(item, index) => `stage-${index}`}
            renderItem={({ item, index }) => (
              <TouchableOpacity 
                style={[
                  styles.stageItem, 
                  activeStage === index ? styles.activeStage : {}
                ]}
                onPress={() => setActiveStage(index)}
              >
                <View style={styles.stageHeader}>
                  <Ionicons name={item.icon as any} size={24} color="#02b1bb" />
                  <Text style={styles.stageTitle}>{item.title}</Text>
                </View>
                <Text style={styles.stageDescription}>{item.description}</Text>
                
                {activeStage === index && (
                  <View style={styles.stageStepsContainer}>
                    {item.steps.map((step, stepIndex) => (
                      <View key={`step-${stepIndex}`} style={styles.stepItem}>
                        <View style={styles.stepDot} />
                        <Text style={styles.stepText}>{step}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

// Main component
const ProgramaDetalleScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<ProgramaDetalleScreenNavigationProp>();
  const { id } = route.params as { id: string };
  const [selectedModule, setSelectedModule] = useState<null | number>(null);

  // Mock program data
  const programas: Record<string, Program> = {
    "1": {
      id: 1,
      name: "Elementia",
      description: "Programa para que alcances tu máximo potencial a través de las metodologías del alto rendimiento",
      fullDescription: "Elementia es un programa integral diseñado para potenciar tu desarrollo personal y profesional. A través de técnicas probadas y metodologías de alto rendimiento, te ayudaremos a descubrir y maximizar tu potencial innato.",
      duration: "12 semanas",
      modules: [{
        title: "Módulo 1: Fundamentos",
        description: "Estableciendo las bases para el éxito",
        completed: true
      }, {
        title: "Módulo 2: Desarrollo Personal",
        description: "Descubriendo tu potencial interior",
        completed: true
      }, {
        title: "Módulo 3: Alto Rendimiento",
        description: "Implementando técnicas avanzadas",
        completed: true
      }],
      color: {
        from: "#4CAF50",
        to: "#2E7D32"
      }
    },
    "2": {
      id: 2,
      name: "Elementia 2",
      description: "Descubre tu poder interior y desarrolla habilidades extraordinarias para el éxito",
      fullDescription: "Elementia 2 es la evolución natural de nuestro programa insignia. En esta nueva etapa, profundizaremos en técnicas avanzadas de desarrollo personal y profesional, llevándote a nuevos niveles de excelencia.",
      duration: "24 semanas",
      modules: [{
        title: "Módulo 1: Consciencia Expandida",
        description: "Desarrolla una perspectiva más amplia de tu potencial",
        completed: true
      }, {
        title: "Módulo 2: Poder Interior",
        description: "Activa y desarrolla tu fuerza interior",
        completed: true
      }, {
        title: "Módulo 3: Maestría Mental",
        description: "Técnicas avanzadas de control mental",
        completed: true
      }, {
        title: "Módulo 4: Transformación Profunda",
        description: "Implementa cambios duraderos en tu vida",
        completed: false,
        current: true
      }, {
        title: "Módulo 5: Liderazgo Consciente",
        description: "Desarrolla habilidades de liderazgo auténtico",
        completed: false
      }, {
        title: "Módulo 6: Influencia Positiva",
        description: "Aprende a impactar positivamente en otros",
        completed: false
      }, {
        title: "Módulo 7: Abundancia y Prosperidad",
        description: "Cultiva una mentalidad de abundancia",
        completed: false
      }, {
        title: "Módulo 8: Relaciones Poderosas",
        description: "Construye conexiones significativas",
        completed: false
      }, {
        title: "Módulo 9: Comunicación Efectiva",
        description: "Mejora tus habilidades de comunicación",
        completed: false
      }, {
        title: "Módulo 10: Gestión Emocional",
        description: "Domina tus emociones y estados internos",
        completed: false
      }, {
        title: "Módulo 11: Propósito y Visión",
        description: "Alinea tu vida con tu propósito más alto",
        completed: false
      }, {
        title: "Módulo 12: Integración y Maestría",
        description: "Consolida tu transformación personal",
        completed: false
      }],
      color: {
        from: "#FF6B6B",
        to: "#C23A3A"
      }
    },
    "3": {
      id: 3,
      name: "Elementia 3",
      description: "Transforma tu mentalidad y alcanza nuevos niveles de excelencia personal",
      fullDescription: "Elementia 3 representa la cumbre de nuestra metodología. Este programa avanzado está diseñado para aquellos que buscan alcanzar la maestría en su desarrollo personal y profesional.",
      duration: "36 semanas",
      modules: [{
        title: "Módulo 1: Nivel Avanzado",
        description: "Preparación para la maestría personal",
        completed: false
      }, {
        title: "Módulo 2: Transformación Total",
        description: "Cambios profundos y duraderos",
        completed: false
      }, {
        title: "Módulo 3: Excelencia Suprema",
        description: "Alcanza tu máximo potencial",
        completed: false
      }],
      color: {
        from: "#8E9196",
        to: "#333333"
      }
    }
  };

  const programa = programas[id as keyof typeof programas];

  const handleModuleClick = (moduleIndex: number, module: Module) => {
    if (!module.completed && !module.current) {
      // Use react native alert
      alert("Este módulo aún no está disponible");
      return;
    }
    navigation.navigate('ModuloDetalle', { id, moduleId: (moduleIndex + 1).toString() });
    setSelectedModule(moduleIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={[programa.color.from, programa.color.to]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <Text style={styles.programTitle}>{programa.name}</Text>
          <Text style={styles.programDescription}>{programa.description}</Text>
        </LinearGradient>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Acerca del Programa</Text>
          <Text style={styles.programFullDescription}>{programa.fullDescription}</Text>
          <View style={styles.durationBadgeContainer}>
            <Text style={styles.durationBadge}>
              Duración: {programa.duration}
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Módulos</Text>
          
          {programa.modules.map((module, index) => (
            <TouchableOpacity
              key={`module-${index}`}
              style={[
                styles.moduleCard,
                module.current ? styles.currentModuleCard : {},
                !module.completed && !module.current ? styles.lockedModuleCard : {}
              ]}
              onPress={() => handleModuleClick(index, module)}
              disabled={!module.completed && !module.current}
            >
              <View style={styles.moduleCardHeader}>
                <View>
                  <View style={styles.moduleTitleContainer}>
                    <Text style={styles.moduleTitle}>
                      {module.title}
                    </Text>
                    {module.completed ? (
                      <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.moduleIcon} />
                    ) : !module.current && (
                      <Ionicons name="lock-closed" size={16} color="#9e9e9e" style={styles.moduleIcon} />
                    )}
                  </View>
                  <Text style={styles.moduleDescription}>{module.description}</Text>
                </View>
                
                {module.current && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>
                      En progreso
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ModuleStages 
        isVisible={selectedModule !== null} 
        onClose={() => setSelectedModule(null)} 
      />
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
    paddingHorizontal: 16,
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
  headerGradient: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  programTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  programFullDescription: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 16,
  },
  sectionContainer: {
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
  durationBadgeContainer: {
    marginTop: 12,
  },
  durationBadge: {
    backgroundColor: 'rgba(60, 60, 70, 0.5)',
    color: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    overflow: 'hidden',
  },
  moduleCard: {
    backgroundColor: 'rgba(40, 40, 50, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(80, 80, 90, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  currentModuleCard: {
    backgroundColor: 'rgba(45, 45, 55, 0.8)',
  },
  lockedModuleCard: {
    opacity: 0.5,
  },
  moduleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  moduleTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  moduleIcon: {
    marginLeft: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#bdbdbd',
    marginTop: 4,
  },
  currentBadge: {
    backgroundColor: 'rgba(255, 64, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    color: '#ff4081',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 4,
  },
  stageItem: {
    backgroundColor: 'rgba(40, 40, 50, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  activeStage: {
    backgroundColor: 'rgba(50, 50, 60, 1)',
  },
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 12,
  },
  stageDescription: {
    fontSize: 14,
    color: '#bdbdbd',
  },
  stageStepsContainer: {
    marginTop: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9c27b0',
    marginRight: 8,
  },
  stepText: {
    fontSize: 14,
    color: '#e0e0e0',
  },
});

export default ProgramaDetalleScreen;
