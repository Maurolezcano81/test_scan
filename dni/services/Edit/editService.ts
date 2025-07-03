import axios from 'axios';
import { baseUrl } from '../../constants/Colors';
import { EditDto } from '../../dtos/EditDto';
import { PersonaEntity } from '../../entities/PersonaEntity';

export async function getPersona(dni: string): Promise<PersonaEntity> {
  const response = await axios.get(`${baseUrl}personas/${dni}`);
  return response.data;
}

export async function updatePersona(data: EditDto): Promise<PersonaEntity> {
  const response = await axios.patch(`${baseUrl}personas/${data.id}`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
} 