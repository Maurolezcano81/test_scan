export interface PersonaEntity {
  id: string;
  tramite: string;
  apellido: string;
  nombre: string;
  genero: string;
  dni: string;
  ejemplar: string;
  fecha_nacimiento: string;
  fecha_emision: string;
  cuil: string;
  [key: string]: any;
} 