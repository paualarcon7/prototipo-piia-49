
import { Routine } from "@/types/rutina";
import { Calendar } from "lucide-react";

// Mock data for demonstration purposes
export const mockRoutines: Routine[] = [
  {
    id: "1",
    name: "Rutina de mañana",
    time: {
      start: "06:30",
      end: "07:15"
    },
    days: ["L", "M", "X", "J", "V"],
    protocols: [
      {
        protocol: {
          id: 1,
          title: "ALMA - PARTE 1: ACTIVA TU ENERGÍA Y DETECTA TU FLUJO",
          dimension: "bienestar",
          tags: ["energía", "flujo", "rendimiento"],
          duration: "15 min",
          description: "Descubre y potencia tu estado de flujo personal",
          icon: Calendar
        },
        order: 0
      },
      {
        protocol: {
          id: 2,
          title: "Protocolo de Alto Rendimiento",
          dimension: "rendimiento",
          tags: ["concentración", "productividad"],
          duration: "30 min",
          description: "Optimiza tu rendimiento mental y físico",
          icon: Calendar
        },
        order: 1
      }
    ],
    syncStatus: "synced",
    calendarId: "abc123",
    notification: {
      enabled: true,
      minutesBefore: 15
    },
    color: "#FF4081",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Rutina de noche",
    time: {
      start: "21:00",
      end: "22:00"
    },
    days: ["L", "M", "X", "J", "V", "S", "D"],
    protocols: [
      {
        protocol: {
          id: 3,
          title: "Meditación para dormir",
          dimension: "bienestar",
          tags: ["meditación", "bienestar"],
          duration: "20 min",
          description: "Meditación guiada para conciliar el sueño",
          icon: Calendar
        },
        order: 0
      }
    ],
    syncStatus: "pending",
    notification: {
      enabled: true,
      minutesBefore: 10
    },
    color: "#5E35B1",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Rutina de fin de semana",
    time: {
      start: "10:00",
      end: "11:30"
    },
    days: ["S", "D"],
    protocols: [
      {
        protocol: {
          id: 4,
          title: "Yoga matutino",
          dimension: "bienestar",
          tags: ["meditación", "energía"],
          duration: "45 min",
          description: "Sesión de yoga para comenzar el día con energía",
          icon: Calendar
        },
        order: 0
      },
      {
        protocol: {
          id: 5,
          title: "Planificación semanal",
          dimension: "rendimiento",
          tags: ["concentración", "productividad"],
          duration: "30 min",
          description: "Organiza tus metas y tareas de la semana",
          icon: Calendar
        },
        order: 1
      }
    ],
    syncStatus: "failed",
    notification: {
      enabled: false,
      minutesBefore: 15
    },
    color: "#43A047",
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
