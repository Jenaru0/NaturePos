// components/VariantCard/VariantCard.tsx
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import styles from './styles';

interface VariantCardProps {
  nombre: string;
  capacidad: number;
  precio: number;
  dependeDeApertura?: boolean;
  onDelete: () => void;
}

const VariantCard: React.FC<VariantCardProps> = ({
  nombre,
  capacidad,
  precio,
  dependeDeApertura,
  onDelete,
}) => {
  const renderRightActions = () => (
    <RectButton
      style={styles.deleteButton}
      onPress={() => {
        Alert.alert(
          'Eliminar Variante',
          `¿Estás seguro de que deseas eliminar la variante "${nombre}"?`,
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', style: 'destructive', onPress: onDelete },
          ]
        );
      }}
    >
      <Text style={styles.deleteButtonText}>Eliminar</Text>
    </RectButton>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.card}>
        <Text style={styles.text}>Variante: {nombre}</Text>
        <Text style={styles.text}>Capacidad: {capacidad}</Text>
        <Text style={styles.text}>Precio: S/{precio.toFixed(2)}</Text>
        {dependeDeApertura && <Text style={styles.text}>Requiere Apertura</Text>}
      </View>
    </Swipeable>
  );
};

export default VariantCard;
