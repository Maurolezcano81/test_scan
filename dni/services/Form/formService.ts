import axios from 'axios';
import { baseUrl } from '../../constants/Colors';
import { FormDto } from '../../dtos/FormDto';

export async function createPersona(data: FormDto) {
  const response = await axios.post(`${baseUrl}personas`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
} 