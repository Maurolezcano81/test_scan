import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { GlobalStyles } from '../../constants/Colors';
import { useTimesLogic } from '../../hooks/Times/useTimesLogic';

const TimesScreen: React.FC = () => {
  const {
    arrayCompetitors,
    currentDorsal,
    setCurrentDorsal,
    isSent,
    addNewCompetitor,
    handleSubmit,
    handleClear,
    handleDelete,
  } = useTimesLogic();

  return (
    <View style={GlobalStyles.container}>
      <Text variant="titleLarge">Carga de tiempos</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="Dorsal del competidor"
        keyboardType="numeric"
        value={currentDorsal}
        onChangeText={setCurrentDorsal}
      />
      <Button mode="contained" onPress={addNewCompetitor}>
        Agregar competidor
      </Button>
      <ScrollView style={{ marginVertical: 12 }}>
        {arrayCompetitors.map((competitor, idx) => (
          <View key={idx} style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{competitor.competidor}</Text>
                <Text style={{ fontSize: 12, color: '#555' }}>{competitor.tiempoLectura}</Text>
              </View>
              <Button mode="outlined" onPress={() => handleDelete(competitor.competidor)} color="red">
                Quitar
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>
      <Button mode="contained" onPress={handleSubmit} disabled={isSent || arrayCompetitors.length === 0} color="green">
        Enviar lista completa
      </Button>
      <Button mode="outlined" onPress={handleClear} color="red">
        Limpiar datos
      </Button>
      <Text style={{ marginTop: 12, fontWeight: 'bold' }}>
        Estado: {arrayCompetitors.length === 0 ? '📝 Sin datos' : isSent ? '✅ Enviado' : '🕒 Pendiente'}
      </Text>
    </View>
  );
};

export default TimesScreen; 