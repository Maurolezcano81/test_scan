import { InscripcionDto } from '../dtos/InscripcionDto';

export function toInscripcionDtoApi(data: InscripcionDto): InscripcionDto {
  let fechaISO = '';
  if (data.fechaNacimiento) {
    let fecha: Date | null = null;
    // Si es formato DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data.fechaNacimiento)) {
      const [dd, mm, yyyy] = data.fechaNacimiento.split('/');
      fecha = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    } else {
      // Intenta parsear como ISO o YYYY-MM-DD
      const f = new Date(data.fechaNacimiento);
      if (!isNaN(f.getTime())) {
        fecha = f;
      }
    }
    if (fecha && !isNaN(fecha.getTime())) {
      fechaISO = fecha.toISOString();
    }
  }
  return {
    ...data,
    fechaNacimiento: fechaISO,
  };
} 