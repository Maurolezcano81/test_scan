import axios from 'axios';
import { baseUrl } from '../../constants/Colors';
import { CompetitorDto } from '../../dtos/CompetitorDto';

export async function sendCompetitors(data: CompetitorDto[]) {
  console.log('[sendCompetitors] Enviando:', data);
  try {
    const response = await axios.post(`${baseUrl}tiempos/manual`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('[sendCompetitors] Respuesta:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('[sendCompetitors] Error:', error?.response?.data || error);
    throw error;
  }
} 