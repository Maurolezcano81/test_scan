import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';

const ShowScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const competidor = Array.isArray(params.competidores) && params.competidores.length > 0 && typeof params.competidores[0] === 'object' ? params.competidores[0] : null;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text variant="titleLarge" style={{ marginBottom: 12 }}>Datos de la persona</Text>
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="labelLarge">Nombre:</Text>
          <Text>{params.nombre}</Text>
          <Text variant="labelLarge">Apellido:</Text>
          <Text>{params.apellido}</Text>
          <Text variant="labelLarge">Fecha de nacimiento:</Text>
          <Text>{params.fechaNacimiento}</Text>
          <Text variant="labelLarge">Género:</Text>
          <Text>{params.genero}</Text>
          <Text variant="labelLarge">Documento Identidad:</Text>
          <Text>{params.documentoIdentidad}</Text>
          <Text variant="labelLarge">Localidad:</Text>
          <Text>{params.localidad}</Text>
          <Text variant="labelLarge">Teléfono:</Text>
          <Text>{params.telefono}</Text>
        </Card.Content>
      </Card>
      <Divider style={{ marginVertical: 8 }} />
      <Text variant="titleMedium" style={{ marginBottom: 8 }}>Datos de inscripción</Text>
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="labelLarge">Tipo Documento:</Text>
          <Text>{params.tipoDocumento}</Text>
          <Text variant="labelLarge">Historial Médico:</Text>
          <Text>{params.historialMedico}</Text>
          <Text variant="labelLarge">Peso:</Text>
          <Text>{params.peso}</Text>
          <Text variant="labelLarge">Altura:</Text>
          <Text>{params.altura}</Text>
          <Text variant="labelLarge">Talle:</Text>
          <Text>{params.talle}</Text>
        </Card.Content>
      </Card>
      {competidor && typeof competidor === 'object' && (
        <>
          <Divider style={{ marginVertical: 8 }} />
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>Datos de competidor</Text>
          <Card>
            <Card.Content>
              <Text variant="labelLarge">ID Competidor:</Text>
              <Text>{(competidor as any).id}</Text>
              <Text variant="labelLarge">Estado:</Text>
              <Text>{(competidor as any).estado}</Text>
              <Text variant="labelLarge">Número Competidor:</Text>
              <Text>{(competidor as any).numeroCompetidor}</Text>
              <Text variant="labelLarge">RFID:</Text>
              <Text>{(competidor as any).rfid}</Text>
            </Card.Content>
          </Card>
        </>
      )}
    </ScrollView>
  );
};

export default ShowScreen; 