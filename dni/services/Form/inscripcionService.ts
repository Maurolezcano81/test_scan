import axios from 'axios';
import { baseUrl } from '../../constants/Colors';
import { InscripcionDto } from '../../dtos/InscripcionDto';

export async function inscribirPersona(data: InscripcionDto) {
  console.log('[inscribirPersona] Enviando:', data);
  const response = await axios.post(`${baseUrl}personas/inscripcion`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('[inscribirPersona] Respuesta:', response.data);
  return response.data;
} 