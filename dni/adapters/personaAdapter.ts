import { PersonaEntity } from '../entities/PersonaEntity';

export function toPersonaEntity(data: any): PersonaEntity {
  return {
    id: String(data.id),
    tramite: String(data.tramite),
    apellido: String(data.apellido),
    nombre: String(data.nombre),
    genero: String(data.genero),
    dni: String(data.dni),
    ejemplar: String(data.ejemplar),
    fecha_nacimiento: String(data.fecha_nacimiento),
    fecha_emision: String(data.fecha_emision),
    cuil: String(data.cuil),
    ...data,
  };
} 