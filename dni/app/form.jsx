import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { baseUrl } from '../constants/Colors';

export default function Form() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    tramite: "",
    apellido: "",
    nombre: "",
    genero: "",
    dni: "",
    ejemplar: "",
    fecha_nacimiento: "",
    fecha_emision: "",
    cuil: "",
  });

  useEffect(() => {
    if (!params?.dni) return;

    // solo si el DNI recibido es diferente al que ya está cargado
    if (params.dni !== form.dni) {
      setForm({
        tramite: params.tramite || "",
        apellido: params.apellido || "",
        nombre: params.nombre || "",
        genero: params.genero || "",
        dni: params.dni || "",
        ejemplar: params.ejemplar || "",
        fecha_nacimiento: params.fecha_nacimiento || "",
        fecha_emision: params.fecha_emision || "",
        cuil: params.cuil || "",
      });
    }
  }, [params?.dni]); // SOLO escucha cambios de dni, no todo el objeto

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}personas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        Alert.alert("Registro guardado");
                router.push({
          pathname: `/edit`,
          params: form.dni,
        });;
      } else {
        Alert.alert("Error al guardar");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error de conexión");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Datos del DNI</Text>
      {Object.keys(form).map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field}
          value={form[field]}
          onChangeText={(text) => handleChange(field, text)}
        />
      ))}
      <Button mode="contained" onPress={handleSubmit}>
        Guardar en BD
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginVertical: 4, borderWidth: 1, borderColor: "#ccc", padding: 8 },
});
