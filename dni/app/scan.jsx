import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { baseUrl } from "../constants/Colors";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [cameraKey, setCameraKey] = useState(0);
  const [pageKey, setPageKey] = useState(0);
  const [manualDni, setManualDni] = useState(""); // ← nuevo campo
  const router = useRouter();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = async (event) => {
    if (scanned) return;
    setScanned(true);

    try {
      const data = event.data;
      console.log("QR capturado: ", data);
      const parts = data.split("@");

      const dniData = {
        tramite: parts[0],
        apellido: parts[1],
        nombre: parts[2],
        genero: parts[3],
        dni: parts[4],
        ejemplar: parts[5],
        fecha_nacimiento: parts[6],
        fecha_emision: parts[7],
        cuil: parts[8],
      };

      console.log(dniData);

      const response = await fetch(`${baseUrl}personas/${dniData.dni}`);
      if (response.ok) {
        const persona = await response.json();
        console.log("Persona existente:", persona);
        router.push({
          pathname: `/edit`,
          params: persona,
        });
      } else if (response.status === 404) {
        router.push({
          pathname: `/form`,
          params: dniData,
        });
      } else {
        alert("Error consultando el servidor");
      }
    } catch (e) {
      console.error(e);
      alert("Error conectando con el servidor");
    }
  };

  // nuevo handler manual
  const handleManualSearch = async () => {
    if (!manualDni) {
      alert("Ingresa un DNI válido");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}personas/${manualDni}`);
      if (response.ok) {
        const persona = await response.json();
        console.log("Persona encontrada manual:", persona);
        router.push({
          pathname: `/edit`,
          params: persona,
        });
      } else if (response.status === 404) {
        alert("No se encontró la persona en la base");
      } else {
        alert("Error consultando el servidor");
      }
    } catch (e) {
      console.error(e);
      alert("Error conectando con el servidor");
    }
  };

  if (!permission || !permission.granted) {
    return <Text>Solicitando permisos de cámara...</Text>;
  }

  return (
    <View key={pageKey} style={{ flex: 1 }}>

      <CameraView
        key={cameraKey}
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417", "code128"],
        }}
      />

      {scanned && (
        <Button
          title="Escanear otra vez"
          onPress={() => {
            setScanned(false);
            setCameraKey((prev) => prev + 1);
          }}
        />
      )}
            <View style={styles.manualContainer}>
  <Text>Buscar DNI manualmente:</Text>
  <TextInput
    style={styles.input}
    placeholder="Ingrese DNI"
    keyboardType="numeric"
    value={manualDni}
    onChangeText={setManualDni}
  />
  <Button
    title="Buscar DNI"
    onPress={handleManualSearch}
  />
</View>

      <Button
        title="Refrescar página"
        color="red"
        onPress={() => {
          setPageKey((prev) => prev + 1);
        }}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  manualContainer: {
    backgroundColor: "white",
    padding: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 4,
    padding: 8,
  },
});
