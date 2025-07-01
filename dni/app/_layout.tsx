import { Tabs, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { usePersonaStore } from "../store/Persona.store";

export default function Layout() {
  
  
   const clearPersona = usePersonaStore((state) => state.clearPersona);

  useFocusEffect(
    useCallback(() => {
      // se ejecuta cada vez que cambio de path
      clearPersona();
      console.log("Layout: datos limpiados");
      return () => {
        clearPersona();
        console.log("Layout: datos limpiados al salir");
      };
    }, [])
  );

  return (
    <Tabs>
      <Tabs.Screen name="scan" options={{ title: "Escanear DNI" }} />
      <Tabs.Screen name="form" options={{ title: "Nuevo registro" }} />
      <Tabs.Screen
        name="edit"
        options={{ title: "Editar persona", href: null }}
      />
    </Tabs>
  );
}
