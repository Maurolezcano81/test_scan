import { useState } from 'react';
import Toast from 'react-native-root-toast';
import { CompetitorDto } from '../../dtos/CompetitorDto';
import { sendCompetitors } from '../../services/Times/timesService';

export function useTimesLogic() {
  const [arrayCompetitors, setArrayCompetitors] = useState<CompetitorDto[]>([]);
  const [currentDorsal, setCurrentDorsal] = useState('');
  const [isSent, setIsSent] = useState(false);

  const addNewCompetitor = () => {
    if (!currentDorsal) return;
    setArrayCompetitors([
      ...arrayCompetitors,
      { competidor: currentDorsal, tiempoLectura: new Date().toISOString() },
    ]);
    setCurrentDorsal('');
    setIsSent(false);
  };

  const handleDelete = (dorsal: string) => {
    setArrayCompetitors(arrayCompetitors.filter((c) => c.competidor !== dorsal));
    if (arrayCompetitors.length === 1) {
      setIsSent(false);
    }
  };

  const handleClear = () => {
    setArrayCompetitors([]);
    setIsSent(false);
  };

  const handleSubmit = async () => {
    try {
      await sendCompetitors(arrayCompetitors);
      setIsSent(true);
      setArrayCompetitors([]);
      setIsSent(false);
      Toast.show('Lista enviada correctamente', { duration: Toast.durations.SHORT, position: Toast.positions.CENTER });
    } catch (e: any) {
      let msg = e?.response?.data?.message || e?.message || 'Error al enviar la lista';
      const details = e?.response?.data?.errorDetails?.message;
      if (Array.isArray(details)) {
        msg = details.join('\n');
      } else if (typeof details === 'string') {
        msg = details;
      }
      Toast.show(msg, { duration: Toast.durations.LONG, position: Toast.positions.CENTER });
    }
  };

  return {
    arrayCompetitors,
    currentDorsal,
    setCurrentDorsal,
    isSent,
    addNewCompetitor,
    handleSubmit,
    handleClear,
    handleDelete,
  };
} 