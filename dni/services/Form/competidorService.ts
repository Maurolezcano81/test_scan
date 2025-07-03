import axios from 'axios';
import { baseUrl } from '../../constants/Colors';

export async function inscribirCompetidor(persona: number, carrera: number) {
  console.log('[inscribirCompetidor] Enviando:', { persona, carrera, estado: 'REGISTRADO' });
  const response = await axios.post(`${baseUrl}competidores`, { persona, carrera, estado: 'REGISTRADO' }, {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('[inscribirCompetidor] Respuesta:', response.data);
  return response.data;
} 