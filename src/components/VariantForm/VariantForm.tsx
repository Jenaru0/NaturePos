// components/VariantForm/VariantForm.tsx
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Switch, Text } from 'react-native-paper';
import styles from './styles';

interface VariantFormProps {
  onAddVariant: (
    nombre: string,
    capacidad: number,
    precio: number,
    dependeDeApertura?: boolean
  ) => void;
}

const VariantForm: React.FC<VariantFormProps> = ({ onAddVariant }) => {
  const [nombreVariante, setNombreVariante] = useState('');
  const [capacidadVariante, setCapacidadVariante] = useState('');
  const [precioVariante, setPrecioVariante] = useState('');
  const [dependeDeApertura, setDependeDeApertura] = useState(false);

  const handleAdd = () => {
    if (!nombreVariante.trim() || !capacidadVariante || !precioVariante) {
      Alert.alert('Error', 'Todos los campos de la variante son obligatorios.');
      return;
    }
    onAddVariant(
      nombreVariante.trim(),
      Number(capacidadVariante),
      Number(precioVariante),
      dependeDeApertura
    );
    setNombreVariante('');
    setCapacidadVariante('');
    setPrecioVariante('');
    setDependeDeApertura(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Agregar Variante</Text>
      <TextInput
        label="Nombre de la Variante"
        value={nombreVariante}
        onChangeText={setNombreVariante}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Capacidad"
        value={capacidadVariante}
        onChangeText={setCapacidadVariante}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Precio"
        value={precioVariante}
        onChangeText={setPrecioVariante}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.switchContainer}>
        <Text>¿Requiere Apertura?</Text>
        <Switch
          value={dependeDeApertura}
          onValueChange={setDependeDeApertura}
        />
      </View>
      <Button mode="contained" onPress={handleAdd} style={styles.addButton}>
        Agregar Variante
      </Button>
    </View>
  );
};

export default React.memo(VariantForm);
