import React, { useState } from 'react';
import { Alert } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import styles from './styles';

interface VariantFormProps {
  onAddVariant: (nombre: string, capacidad: number, precio: number) => void;
}

const VariantForm: React.FC<VariantFormProps> = ({ onAddVariant }) => {
  const [nombreVariante, setNombreVariante] = useState('');
  const [capacidadVariante, setCapacidadVariante] = useState('');
  const [precioVariante, setPrecioVariante] = useState('');

  const handleAddVariante = () => {
    if (nombreVariante && capacidadVariante && precioVariante) {
      onAddVariant(nombreVariante, Number(capacidadVariante), Number(precioVariante));
      setNombreVariante('');
      setCapacidadVariante('');
      setPrecioVariante('');
    } else {
      Alert.alert('Error', 'Todos los campos de la variante son obligatorios.');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Agregar Variante" />
      <Card.Content>
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
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Precio"
          value={precioVariante}
          onChangeText={setPrecioVariante}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleAddVariante} style={styles.addButton}>
          Agregar Variante
        </Button>
      </Card.Content>
    </Card>
  );
};

export default React.memo(VariantForm);
