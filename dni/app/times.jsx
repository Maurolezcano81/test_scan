import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Times() {
  const [arrayCompetitors, setArrayCompetitors] = useState([]);
  const [currentDorsal, setCurrentDorsal] = useState("");
  const [isSent, setIsSent] = useState(false);

  // cargar desde memoria
  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem("competitors");
        const sent = await AsyncStorage.getItem("isSent");
        if (stored) {
          setArrayCompetitors(JSON.parse(stored));
        }
        if (sent === "true") {
          setIsSent(true);
        }
      } catch (e) {
        console.error("Error leyendo AsyncStorage", e);
      }
    };
    loadData();
  }, []);

  // guardar cada vez que cambie
  useEffect(() => {
    AsyncStorage.setItem("competitors", JSON.stringify(arrayCompetitors));
  }, [arrayCompetitors]);

  useEffect(() => {
    AsyncStorage.setItem("isSent", isSent ? "true" : "false");
  }, [isSent]);

  const addNewCompetitor = () => {
    if (!currentDorsal) {
      Alert.alert("Ingrese un dorsal válido");
      return;
    }
    setArrayCompetitors((prev) => [
      ...prev,
      {
        numeroCompetidor: currentDorsal,
        tiempoLectura: new Date().toISOString(),
      },
    ]);
    setIsSent(false); // nuevo agregado invalida el envío
    setCurrentDorsal("");
  };

  const handleSubmit = () => {
    console.log(arrayCompetitors);
    Alert.alert("Enviado", `Se enviaron ${arrayCompetitors.length} competidores`);
    setIsSent(true);
  };

  const handleClear = async () => {
    Alert.alert("Confirmar", "¿Deseas borrar todos los datos?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Borrar",
        onPress: async () => {
          setArrayCompetitors([]);
          setIsSent(false);
          await AsyncStorage.removeItem("competitors");
          await AsyncStorage.removeItem("isSent");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carga de tiempos</Text>

      <TextInput
        style={styles.input}
        placeholder="Dorsal del competidor"
        keyboardType="numeric"
        value={currentDorsal}
        onChangeText={setCurrentDorsal}
      />

      <Button title="Agregar competidor" onPress={addNewCompetitor} />

      <ScrollView style={styles.listContainer}>
        {arrayCompetitors.map((competitor, idx) => (
          <View key={idx} style={styles.listItem}>
            <Text>{competitor.numeroCompetidor}</Text>
            <Text style={styles.time}>{competitor.tiempoLectura}</Text>
          </View>
        ))}
      </ScrollView>

      <Button
        title="Enviar lista completa"
        color="green"
        onPress={handleSubmit}
        disabled={isSent}
      />

      <Button
        title="Limpiar datos"
        color="red"
        onPress={handleClear}
      />

      <Text style={styles.status}>
        Estado: {isSent ? "✅ Enviado" : "🕒 Pendiente"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  input: {
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
  listContainer: {
    marginVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  listItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  time: {
    fontSize: 12,
    color: "#555",
  },
  status: {
    marginTop: 12,
    fontWeight: "bold",
  },
});
