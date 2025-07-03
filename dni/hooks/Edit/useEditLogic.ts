import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import Toast from 'react-native-root-toast';
import { InscripcionDto, Talle } from '../../dtos/InscripcionDto';
import { inscribirPersona } from '../../services/Form/inscripcionService';

const defaultValues: InscripcionDto = {
  nombre: '',
  apellido: '',
  fechaNacimiento: '',
  genero: '',
  documentoIdentidad: '',
  tipoDocumento: 'DNI',
  historialMedico: '',
  peso: 0,
  altura: 0,
  localidad: '',
  talle: Talle.M,
};

export function useEditLogic() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [data, setData] = useState<InscripcionDto>(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const lastDni = useRef<string | undefined>(undefined);

  useEffect(() => {
    const dniParam = String(params.documentoIdentidad || params.dni || '');
    if (dniParam && lastDni.current !== dniParam) {
      setData({
        nombre: String(params.nombre || ''),
        apellido: String(params.apellido || ''),
        fechaNacimiento: String((params.fechaNacimiento || params.fecha_nacimiento || '').slice(0, 10)),
        genero: String(params.genero || ''),
        documentoIdentidad: dniParam,
        tipoDocumento: String(params.tipoDocumento || 'DNI'),
        historialMedico: String(params.historialMedico || ''),
        peso: Number(params.peso || 0),
        altura: Number(params.altura || 0),
        localidad: String(params.localidad || ''),
        talle: (params.talle as Talle) || Talle.M,
      });
      lastDni.current = dniParam;
    }
    if (!dniParam && lastDni.current === undefined) {
      setData(defaultValues);
      lastDni.current = '';
    }
  }, [params]);

  const handleChange = (key: keyof InscripcionDto, value: string | number) => {
    setData({ ...data, [key]: value });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await inscribirPersona(data);
      Toast.show('Registro actualizado', { duration: Toast.durations.SHORT });
      router.push('/scan');
    } catch (e: any) {
      let msg = e?.response?.data?.message || e?.message || 'Error al actualizar';
      const details = e?.response?.data?.errorDetails?.message;
      if (Array.isArray(details)) {
        msg = details.join('\n');
      }
      Toast.show(msg, { duration: Toast.durations.LONG, position: Toast.positions.CENTER });
    } finally {
      setIsLoading(false);
    }
  };

  return { data, handleChange, handleUpdate, isLoading };
} 