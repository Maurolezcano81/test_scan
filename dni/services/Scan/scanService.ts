import axios from 'axios';
import { baseUrl } from '../../constants/Colors';

export async function fetchPersonaByDni(dni: string) {
  try {
    const response = await axios.get(`${baseUrl}personas/${dni}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
} 