export interface InscripcionDto {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  genero: string;
  documentoIdentidad: string;
  tipoDocumento: string;
  historialMedico: string;
  peso: number;
  altura: number;
  localidad: string;
  talle: Talle;
  estado?: string;
}

export enum Talle {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
} 