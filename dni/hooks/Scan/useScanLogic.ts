import { useCameraPermissions } from 'expo-camera';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useScanLogic() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [manualDni, setManualDni] = useState('');
  const [cameraKey, setCameraKey] = useState(0);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      setManualDni('');
      setCameraKey((prev) => prev + 1);
    }, [])
  );

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = async (event: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    try {
      const data = event.data;
      console.log(data);
      const parts = data.split('@');
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
      router.push({ pathname: '/form', params: dniData });
    } catch (e: any) {
      Alert.alert('Error consultando el servidor', e?.message || '');
    }
  };

  const handleManualSearch = async () => {
    if (!manualDni) {
      Alert.alert('Ingresa un DNI válido');
      return;
    }
    try {
      router.push({ pathname: '/form', params: { dni: manualDni } });
    } catch (e) {
      Alert.alert('Error consultando el servidor');
    }
  };

  return {
    permission,
    requestPermission,
    scanned,
    setScanned,
    manualDni,
    setManualDni,
    cameraKey,
    handleBarcodeScanned,
    handleManualSearch,
  };
} 