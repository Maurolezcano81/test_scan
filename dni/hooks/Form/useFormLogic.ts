import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import Toast from 'react-native-root-toast';
import { InscripcionDto, Talle } from '../../dtos/InscripcionDto';
import { inscribirCompetidor } from '../../services/Form/competidorService';
import { inscribirPersona } from '../../services/Form/inscripcionService';
import { toInscripcionDtoApi } from '../../transformers/inscripcionTransformer';

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
  estado: 'REGISTRADO',
};

export function useFormLogic() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [initialFormValues, setInitialFormValues] = useState<InscripcionDto>(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const [showCarreraSelector, setShowCarreraSelector] = useState(false);
  const [personaId, setPersonaId] = useState<number | null>(null);
  const lastDni = useRef<string | undefined>(undefined);

  useEffect(() => {
    const dniParam = String(params.documentoIdentidad || params.dni || '');
    if (dniParam && lastDni.current !== dniParam) {
      setInitialFormValues({
        nombre: String(params.nombre || ''),
        apellido: String(params.apellido || ''),
        fechaNacimiento: String((params.fechaNacimiento || params.fecha_nacimiento || '').slice(0, 10)),
        genero: String(params.genero || ''),
        documentoIdentidad: dniParam,
        tipoDocumento: 'DNI',
        historialMedico: String(params.historialMedico || ''),
        peso: Number(params.peso || 0),
        altura: Number(params.altura || 0),
        localidad: String(params.localidad || ''),
        talle: (params.talle as Talle) || Talle.M,
        estado: 'REGISTRADO',
      });
      lastDni.current = dniParam;
    }
    if (!dniParam && lastDni.current === undefined) {
      setInitialFormValues(defaultValues);
      lastDni.current = '';
    }
  }, [params]);

  // POST: crear persona
  const handleSubmitForm = async (values: InscripcionDto) => {
    setIsLoading(true);
    try {
      const valuesToSend = toInscripcionDtoApi(values);
      const { estado, ...rest } = valuesToSend;
      console.log('Enviando:', rest);
      const res = await inscribirPersona(rest);
      console.log('[handleSubmitForm] Respuesta inscribirPersona:', res);
      console.log('[handleSubmitForm] typeof res.competidores:', typeof res.competidores, 'valor:', res.competidores);
      if (Array.isArray(res.competidores) && res.competidores.length === 0) {
        // Solo mostrar selector de carrera si competidores es un array vacío
        setPersonaId(res.id);
        setShowCarreraSelector(true);
        Toast.show('Selecciona una carrera para inscribir', { duration: Toast.durations.LONG, position: Toast.positions.CENTER });
      } else if (Array.isArray(res.competidores) && res.competidores.length > 0) {
        // Si competidores tiene elementos, redirigir a visualización con todos los datos
        router.push({ pathname: '/showcompetitor', params: { ...res, competidores: JSON.stringify(res.competidores) } });
      } else {
        Toast.show('Error: respuesta inesperada del backend', { duration: Toast.durations.LONG, position: Toast.positions.CENTER });
      }
    } catch (e: any) {
      let msg = e?.response?.data?.message || e?.message || 'Error al guardar';
      const details = e?.response?.data?.errorDetails?.message;
      if (Array.isArray(details)) {
        msg = details.join('\n');
      }
      Toast.show(msg, { duration: Toast.durations.LONG, position: Toast.positions.CENTER });
    } finally {
      setIsLoading(false);
    }
  };

  // PATCH: editar persona (puedes adaptar el service si tienes endpoint PATCH)
  const handleUpdateForm = async (values: InscripcionDto, id: number) => {
    setIsLoading(true);
    try {
      // Aquí deberías llamar a tu service de actualización (PATCH)
      // Ejemplo: await actualizarPersona(id, values);
      Toast.show('Persona actualizada', { duration: Toast.durations.SHORT });
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

  const handleInscribirCarrera = async (carreraId: number) => {
    if (!personaId) return;
    setIsLoading(true);
    try {
      const res = await inscribirCompetidor(personaId, carreraId);
      if (res) {
        router.push({ pathname: '/edit', params: { ...res } });
      } else {
        Toast.show('Error inscribiendo a la carrera', { duration: Toast.durations.LONG, position: Toast.positions.CENTER });
      }
    } catch (e: any) {
      let msg = e?.response?.data?.message || e?.message || 'Error inscribiendo a la carrera';
      const details = e?.response?.data?.errorDetails?.message;
      if (Array.isArray(details)) {
        msg = details.join('\n');
      }
      Toast.show(msg, { duration: Toast.durations.LONG, position: Toast.positions.CENTER });
    } finally {
      setIsLoading(false);
    }
  };

  // Función para limpiar el formulario y el ref
  const resetForm = () => {
    setInitialFormValues(defaultValues);
    lastDni.current = undefined;
  };

  return { handleSubmitForm, handleUpdateForm, initialFormValues, isLoading, showCarreraSelector, handleInscribirCarrera, resetForm };
} 