import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { GlobalStyles } from '../../constants/Colors';
import { Talle } from '../../dtos/InscripcionDto';
import { useCarreras } from '../../hooks/Form/useCarreras';
import { useFormLogic } from '../../hooks/Form/useFormLogic';

const talles = Object.values(Talle);

const FormScreen: React.FC = () => {
  const { handleSubmitForm, initialFormValues, isLoading, showCarreraSelector, handleInscribirCarrera, resetForm } = useFormLogic();
  const { carreras, loading: loadingCarreras } = useCarreras();
  const [selectedCarrera, setSelectedCarrera] = React.useState<number | null>(null);
  const [formValues, setFormValues] = React.useState(initialFormValues);

  // Limpiar el formulario al montar la pantalla
  React.useEffect(() => {
    resetForm();
  }, []);

  // Sincronizar formValues solo cuando cambian los initialFormValues (nuevo DNI)
  React.useEffect(() => {
    setFormValues(initialFormValues);
  }, [initialFormValues]);

  // Renderiza el selector de carrera si corresponde
  if (showCarreraSelector) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text variant="titleLarge">Selecciona una carrera</Text>
        <Picker
          selectedValue={selectedCarrera}
          onValueChange={value => setSelectedCarrera(value)}
          style={{ width: '100%', marginVertical: 16 }}
        >
          <Picker.Item label="Selecciona una carrera..." value={null} />
          {carreras.map((c) => (
            <Picker.Item key={c.id} label={`${c.kilometraje}K - ${c.genero} - ${c.descripcion}`} value={c.id} />
          ))}
        </Picker>
        <Button
          mode="contained"
          onPress={() => selectedCarrera && handleInscribirCarrera(selectedCarrera)}
          disabled={!selectedCarrera || loadingCarreras}
        >
          Inscribir
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <Text variant="titleLarge">Datos del DNI</Text>
        <TextInput
          style={GlobalStyles.input}
          label="Nombre"
          value={formValues.nombre}
          onChangeText={text => setFormValues({ ...formValues, nombre: text })}
        />
        <TextInput
          style={GlobalStyles.input}
          label="Apellido"
          value={formValues.apellido}
          onChangeText={text => setFormValues({ ...formValues, apellido: text })}
        />
        <Text style={{ marginTop: 8, marginBottom: 4 }}>Fecha de nacimiento</Text>
        <TextInput
          style={GlobalStyles.input}
          label="Fecha de nacimiento"
          value={formValues.fechaNacimiento}
          onChangeText={text => setFormValues({ ...formValues, fechaNacimiento: text })}
          placeholder="YYYY-MM-DD"
        />
        <TextInput
          style={GlobalStyles.input}
          label="Género"
          value={formValues.genero}
          onChangeText={text => setFormValues({ ...formValues, genero: text })}
        />
        <TextInput
          style={GlobalStyles.input}
          label="Documento Identidad"
          value={formValues.documentoIdentidad}
          onChangeText={text => setFormValues({ ...formValues, documentoIdentidad: text })}
        />
        <TextInput
          style={GlobalStyles.input}
          label="Tipo Documento"
          value={formValues.tipoDocumento}
          onChangeText={text => setFormValues({ ...formValues, tipoDocumento: text })}
        />
        <TextInput
          style={GlobalStyles.input}
          label="Historial Médico"
          value={formValues.historialMedico}
          onChangeText={text => setFormValues({ ...formValues, historialMedico: text })}
        />
        <TextInput
          style={GlobalStyles.input}
          label="Peso (kg)"
          value={String(formValues.peso)}
          keyboardType="numeric"
          onChangeText={text => setFormValues({ ...formValues, peso: Number(text) })}
        />
        <TextInput
          style={GlobalStyles.input}
          label="Altura (cm)"
          value={String(formValues.altura)}
          keyboardType="numeric"
          onChangeText={text => setFormValues({ ...formValues, altura: Number(text) })}
        />
        <TextInput
          style={GlobalStyles.input}
          label="Localidad"
          value={formValues.localidad}
          onChangeText={text => setFormValues({ ...formValues, localidad: text })}
        />
        {/* Selector de talle */}
        <Text variant="labelLarge">Talle</Text>
        <Picker
          selectedValue={formValues.talle}
          onValueChange={value => setFormValues({ ...formValues, talle: value })}
          style={{ marginBottom: 12 }}
        >
          {talles.map(t => (
            <Picker.Item key={t} label={t} value={t} />
          ))}
        </Picker>
        <Button mode="contained" onPress={() => handleSubmitForm(formValues)} loading={isLoading}>
          Comprobar Datos
        </Button>
      </ScrollView>
    </View>
  );
};

export default FormScreen; 