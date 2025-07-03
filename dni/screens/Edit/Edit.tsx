import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { baseUrl } from '../../constants/Colors';

export default function Edit() {
  const { dni } = useLocalSearchParams();
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!dni) return;

    setData(null); // 👈
    fetch(`${baseUrl}personas/${dni}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error(err);
        Alert.alert("Error consultando persona");
      });
  }, [dni]);

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${baseUrl}personas/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        Alert.alert("Registro actualizado");
        router.push("/scan");
      } else {
        Alert.alert("Error al actualizar");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error de conexión");
    }
  };

  if (!data) return <Text>Cargando datos...</Text>;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Editar persona</Text>
      {Object.keys(data).map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field}
          value={String(data[field])}
          onChangeText={(text) => handleChange(field, text)}
        />
      ))}
      <Button mode="contained" onPress={handleUpdate}>
        Guardar cambios
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: { marginVertical: 4, borderWidth: 1, borderColor: "#ccc", padding: 8 },
});
