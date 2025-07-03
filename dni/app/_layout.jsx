import { Ionicons } from "@expo/vector-icons";
import { Tabs, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import { paperTheme } from '../constants/Colors';
import { usePersonaStore } from "../store/Persona.store";

export default function Layout() {
  const clearPersona = usePersonaStore((state) => state.clearPersona);

  useFocusEffect(
    useCallback(() => {
      clearPersona();
      console.log("Layout: datos limpiados");
      return () => {
        clearPersona();
        console.log("Layout: datos limpiados al salir");
      };
    }, [])
  );

  return (
    <RootSiblingParent>
      <PaperProvider theme={paperTheme}>
        <Tabs>
          <Tabs.Screen
            name="scan"
            options={{
              title: "Escanear DNI",
              unmountOnBlur: true, // para desmontar y reiniciar el Scan
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="camera-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="form"
            options={{
              title: "Nuevo registro",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="times"
            options={{
              title: "Cargar tiempos",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="timer-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="showcompetitor"
            options={{
              title: "Ver competidor",
              href: null, // oculta de la navegación
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="eye-outline" color={color} size={size} />
              ),
            }}
          />
        </Tabs>
      </PaperProvider>
    </RootSiblingParent>
  );
}
