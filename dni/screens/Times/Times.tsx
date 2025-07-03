import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useTimes } from "../../hooks/useTimes";

export default function Times() {
  const {
    arrayCompetitors,
    currentDorsal,
    setCurrentDorsal,
    isSent,
    addNewCompetitor,
    handleSubmit,
    handleClear,
    handleDelete,
  } = useTimes();

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
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.bold}>{competitor.competidor}</Text>
                <Text style={styles.time}>{competitor.tiempoLectura}</Text>
              </View>
              <Button
                title="Quitar"
                color="red"
                onPress={() => handleDelete(competitor.competidor)}
              />
            </View>
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
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
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
  bold: {
    fontWeight: "bold",
    fontSize: 16,
  },
  status: {
    marginTop: 12,
    fontWeight: "bold",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
