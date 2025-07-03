import { useEffect, useState } from 'react';
import { getCarreras } from '../../services/Form/carreraService';

export function useCarreras(eventoId: number = 2) {
  const [carreras, setCarreras] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCarreras(eventoId)
      .then(setCarreras)
      .catch((e) => setError(e?.message || 'Error cargando carreras'))
      .finally(() => setLoading(false));
  }, [eventoId]);

  return { carreras, loading, error };
} 