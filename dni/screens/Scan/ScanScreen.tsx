import { CameraView } from 'expo-camera';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { GlobalStyles } from '../../constants/Colors';
import { useScanLogic } from '../../hooks/Scan/useScanLogic';

const ScanScreen: React.FC = () => {
  const {
    permission,
    scanned,
    setScanned,
    manualDni,
    setManualDni,
    cameraKey,
    handleBarcodeScanned,
    handleManualSearch,
  } = useScanLogic();

  if (!permission) {
    console.log('[ScanScreen] Estado de permisos: no inicializado');
    return <Text>Cargando permisos de cámara...</Text>;
  }

  if (permission && permission.status === 'denied') {
    console.log('[ScanScreen] Permiso de cámara denegado');
    return <Text>No se otorgaron permisos de cámara. Por favor, actívalos en la configuración.</Text>;
  }

  if (!permission.granted) {
    console.log('[ScanScreen] Solicitando permisos de cámara...');
    return <Text>Solicitando permisos de cámara...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, minHeight: 300 }}>
        <CameraView
          key={cameraKey}
          style={{ flex: 1, borderRadius: 12, overflow: 'hidden' }}
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr', 'pdf417', 'code128'] }}
        />
      </View>
      {scanned && (
        <Button mode="contained" onPress={() => setScanned(false)}>
          Escanear otra vez
        </Button>
      )}
      <View style={styles.manualContainer}>
        <Text>Buscar DNI manualmente:</Text>
        <TextInput
          style={GlobalStyles.input}
          placeholder="Ingrese DNI"
          keyboardType="numeric"
          value={manualDni}
          onChangeText={setManualDni}
        />
        <Button mode="contained" onPress={handleManualSearch}>
          Buscar DNI
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  manualContainer: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 5,
    marginTop: 12,
  },
});

export default ScanScreen; 