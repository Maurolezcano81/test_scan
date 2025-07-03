import axios from 'axios';
import { baseUrl } from '../../constants/Colors';

export async function getCarreras() {
  const response = await axios.get(`${baseUrl}eventos/2`);
  // El array de carreras está en response.data.carreras
  return response.data.carreras;
} 