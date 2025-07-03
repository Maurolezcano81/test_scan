import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { Colors, GlobalStyles } from '../constants/Colors';

const ShowCompetitorScreen: React.FC = () => {
  const params = useLocalSearchParams();
  let competidores: any[] = [];
  if (typeof params.competidores === 'string') {
    try {
      competidores = JSON.parse(params.competidores);
    } catch {
      competidores = [];
    }
  } else if (Array.isArray(params.competidores)) {
    competidores = params.competidores;
  }

  console.log(params, 'params');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={{padding: 16}}>
        <Text style={[GlobalStyles.title, { color: Colors.primary, fontWeight: '700' }]}>Datos de la persona</Text>
        <Card style={{ marginBottom: 16, backgroundColor: Colors.surface, borderColor: Colors.primary, borderWidth: 1 }}>
          <Card.Content>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Nombre:</Text>
            <Text style={{ color: Colors.text }}>{params.nombre}</Text>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Apellido:</Text>
            <Text style={{ color: Colors.text }}>{params.apellido}</Text>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Fecha de nacimiento:</Text>
            <Text style={{ color: Colors.text }}>{params.fechaNacimiento}</Text>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Género:</Text>
            <Text style={{ color: Colors.text }}>{params.genero}</Text>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Documento Identidad:</Text>
            <Text style={{ color: Colors.text }}>{params.documentoIdentidad}</Text>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Localidad:</Text>
            <Text style={{ color: Colors.text }}>{params.localidad}</Text>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Teléfono:</Text>
            <Text style={{ color: Colors.text }}>{params.telefono}</Text>
          </Card.Content>
        </Card>
        <Divider style={{ marginVertical: 8, backgroundColor: Colors.primary }} />
        <Text style={[GlobalStyles.title, { color: Colors.primary, fontSize: 20, marginBottom: 8, fontWeight: '700' }]}>Datos de inscripción</Text>
        <Card style={{ marginBottom: 16, backgroundColor: Colors.surface, borderColor: Colors.primary, borderWidth: 1 }}>
          <Card.Content>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Tipo Documento:</Text>
            <Text style={{ color: Colors.text }}>{params.tipoDocumento}</Text>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Historial Médico:</Text>
            <Text style={{ color: Colors.text }}>{params.historialMedico}</Text>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Peso:</Text>
            <Text style={{ color: Colors.text }}>{params.peso}</Text>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Altura:</Text>
            <Text style={{ color: Colors.text }}>{params.altura}</Text>
            <Text style={{ color: Colors.text, fontWeight: '700' }}>Talle:</Text>
            <Text style={{ color: Colors.text }}>{params.talle}</Text>
          </Card.Content>
        </Card>
        <Divider style={{ marginVertical: 8, backgroundColor: Colors.primary }} />
        <Text style={[GlobalStyles.title, { color: Colors.primary, fontSize: 20, marginBottom: 8, fontWeight: '700' }]}>Datos de competidor</Text>
        {competidores.length === 0 && <Text style={{ color: Colors.text }}>No hay competidores registrados.</Text>}
        {competidores.map((comp: any, idx: number) => (
          <Card key={idx} style={{ marginBottom: 16, backgroundColor: Colors.surface, borderColor: Colors.primary, borderWidth: 1 }}>
            <Card.Content>
              <Text style={{ color: Colors.text, fontWeight: '700' }}>ID Competidor:</Text>
              <Text style={{ color: Colors.text }}>{comp.id}</Text>
              <Text style={{ color: Colors.text, fontWeight: '700' }}>Estado:</Text>
              <Text style={{ color: Colors.text }}>{comp.estado}</Text>
              <Text style={{ color: Colors.text, fontWeight: '700' }}>Número Competidor:</Text>
              <Text style={{ color: Colors.text }}>{comp.numeroCompetidor}</Text>
              <Text style={{ color: Colors.text, fontWeight: '700' }}>RFID:</Text>
              <Text style={{ color: Colors.text }}>{comp.rfid}</Text>
            </Card.Content>
          </Card>
        ))}
        {/* Sección de carrera fuera del bucle de competidores */}
        {competidores.length > 0 && competidores[0].carrera && typeof competidores[0].carrera === 'object' && (
          <>
            <Divider style={{ marginVertical: 8, backgroundColor: Colors.primary }} />
            <Text style={[GlobalStyles.title, { color: Colors.primary, fontSize: 20, marginBottom: 8, fontWeight: '700' }]}>Datos de la carrera</Text>
            <Card style={{ marginBottom: 16, backgroundColor: Colors.surface, borderColor: Colors.primary, borderWidth: 1 }}>
              <Card.Content>
                <Text style={{ color: Colors.text, fontWeight: '700' }}>Descripción:</Text>
                <Text style={{ color: Colors.text }}>{competidores[0].carrera.descripcion}</Text>
                <Text style={{ color: Colors.text, fontWeight: '700' }}>Estado:</Text>
                <Text style={{ color: Colors.text }}>{competidores[0].carrera.estado}</Text>
                <Text style={{ color: Colors.text, fontWeight: '700' }}>ID Carrera:</Text>
                <Text style={{ color: Colors.text }}>{competidores[0].carrera.id}</Text>
                <Text style={{ color: Colors.text, fontWeight: '700' }}>Hora Inicio:</Text>
                <Text style={{ color: Colors.text }}>{competidores[0].carrera.horaInicio}</Text>
                <Text style={{ color: Colors.text, fontWeight: '700' }}>Kilometraje:</Text>
                <Text style={{ color: Colors.text }}>{competidores[0].carrera.kilometraje}</Text>
                <Text style={{ color: Colors.text, fontWeight: '700' }}>Edad Mínima:</Text>
                <Text style={{ color: Colors.text }}>{competidores[0].carrera.edadMinima}</Text>
                <Text style={{ color: Colors.text, fontWeight: '700' }}>Edad Máxima:</Text>
                <Text style={{ color: Colors.text }}>{competidores[0].carrera.edadMaxima}</Text>
              </Card.Content>
            </Card>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowCompetitorScreen; 