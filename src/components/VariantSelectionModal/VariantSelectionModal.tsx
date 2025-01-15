// components/VariantSelectionModal/VariantSelectionModal.tsx
import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Card, Text, Button, RadioButton } from 'react-native-paper';
import { Product } from '../../types/Product';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useCart } from '../../context/CartContext';

interface Props {
  visible: boolean;
  product: Product;
  onClose: () => void;
}

const VariantSelectionModal: React.FC<Props> = ({
  visible,
  product,
  onClose,
}) => {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string>('entero');
  const [qty] = useState(1); // si quieres permitir multiple contenedores

  const handleConfirm = async () => {
    const updated = { ...product };

    if (selectedVariant === 'entero') {
      // Vender contenedor entero
      if (updated.stock < qty) {
        Alert.alert('Error', 'No hay stock suficiente de contenedores.');
        return;
      }
      updated.stock -= qty;
      addItem({
        productId: updated.id || '',
        nombre: updated.nombre + ' (entero)',
        cantidad: qty,
        precio: updated.precio,
      });
    } else {
      // Buscar la variante
      const variant = updated.variantes?.find((v) => v.nombre === selectedVariant);
      if (!variant) {
        Alert.alert('Error', 'Variante no encontrada');
        return;
      }
      // Chequear si dependeDeApertura
      if (variant.dependeDeApertura) {
        // Si no hay suficientes “unidadesAbiertasDisponibles”, intentar abrir contenedores
        const needed = variant.capacidad * qty;
        if ((updated.unidadesAbiertasDisponibles ?? 0) < needed) {
          if (updated.stock > 0) {
            updated.stock -= 1;
            updated.contenedoresAbiertos = (updated.contenedoresAbiertos ?? 0) + 1;
            updated.unidadesAbiertasDisponibles =
              (updated.unidadesAbiertasDisponibles ?? 0) + (updated.unidadesPorContenedor ?? 0);
          } else {
            Alert.alert('Error', 'No hay contenedores para abrir.');
            return;
          }
        }
        // Ahora restar
        if ((updated.unidadesAbiertasDisponibles ?? 0) < needed) {
          Alert.alert('Error', 'No hay suficientes unidades abiertas.');
          return;
        }
        updated.unidadesAbiertasDisponibles =
          (updated.unidadesAbiertasDisponibles ?? 0) - needed;

        addItem({
          productId: updated.id || '',
          nombre: updated.nombre + ' - ' + variant.nombre,
          cantidad: qty,
          precio: variant.precio,
        });
      } else {
        // Variante que no requiere apertura => restar stock normal
        if (updated.stock < qty) {
          Alert.alert('Error', 'No hay stock suficiente de contenedores.');
          return;
        }
        updated.stock -= qty;

        addItem({
          productId: updated.id || '',
          nombre: updated.nombre + ' - ' + variant.nombre,
          cantidad: qty,
          precio: variant.precio,
        });
      }
    }

    // Guardar cambios en Firestore
    if (updated.id) {
      await updateDoc(doc(db, 'productos', updated.id), {
        stock: updated.stock,
        contenedoresAbiertos: updated.contenedoresAbiertos ?? 0,
        unidadesAbiertasDisponibles: updated.unidadesAbiertasDisponibles ?? 0,
      });
    }

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <Card style={styles.card}>
            <Card.Title title={product.nombre} />
            <Card.Content>
              <Text>Stock contenedores: {product.stock}</Text>
              <Text>Unidades abiertas: {product.unidadesAbiertasDisponibles ?? 0}</Text>
              <RadioButton.Group
                onValueChange={setSelectedVariant}
                value={selectedVariant}
              >
                <View style={styles.radioRow}>
                  <RadioButton value="entero" />
                  <Text>Vender Contenedor Entero (S/{product.precio})</Text>
                </View>
                {product.variantes?.map((v) => (
                  <View style={styles.radioRow} key={v.nombre}>
                    <RadioButton value={v.nombre} />
                    <Text>
                      {v.nombre} (S/{v.precio}){v.dependeDeApertura ? ' [Req. Apertura]' : ''}
                    </Text>
                  </View>
                ))}
              </RadioButton.Group>
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <Button onPress={onClose}>Cancelar</Button>
              <Button mode="contained" onPress={handleConfirm}>
                Confirmar
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default VariantSelectionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  actions: {
    justifyContent: 'flex-end',
  },
});
