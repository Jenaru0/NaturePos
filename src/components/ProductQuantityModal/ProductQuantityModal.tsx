import React, { useState } from 'react';
import { Modal, View, StyleSheet, Alert } from 'react-native';
import { Card, Button, Text, TextInput } from 'react-native-paper';
import { useCart } from '../../context/CartContext';
import { db } from '../../services/firebase';
import { doc, runTransaction } from 'firebase/firestore';

interface Props {
  visible: boolean;
  product: {
    id: string;
    nombre?: string;
    precio?: number;
    stock: number;
  };
  onClose: () => void;
}

const ProductQuantityModal: React.FC<Props> = ({ visible, product, onClose }) => {
  const { addItem } = useCart();
  const [cantidad, setCantidad] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!product) {
    return null;
  }

  const handleAddToCart = async () => {
    const qty = parseInt(cantidad, 10);

    if (isNaN(qty) || qty <= 0) {
      setErrorMessage('Por favor, ingresa una cantidad válida.');
      return;
    }

    if (qty > product.stock) {
      setErrorMessage('La cantidad seleccionada supera el stock disponible.');
      return;
    }

    try {
      await runTransaction(db, async (transaction) => {
        const productRef = doc(db, 'productos', product.id);
        const productSnapshot = await transaction.get(productRef);
        const currentStock = productSnapshot.data()?.stock ?? 0;

        if (currentStock < qty) {
          throw new Error('Stock insuficiente.');
        }

        transaction.update(productRef, { stock: currentStock - qty });
      });

      addItem({
        productId: product.id,
        nombre: product.nombre ?? 'Producto sin nombre',
        precio: product.precio ?? 0,
        cantidad: qty,
      });

      onClose();
      setCantidad('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      Alert.alert('Error', 'No se pudo agregar el producto. Intente nuevamente.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <Card style={styles.card}>
          <Card.Title title={product.nombre ?? 'Producto sin nombre'} />
          <Card.Content>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <Text style={styles.infoText}>Precio: S/{(product.precio ?? 0).toFixed(2)}</Text>
            <Text style={styles.infoText}>Stock disponible: {product.stock}</Text>
            <TextInput
              label="Cantidad"
              value={cantidad}
              onChangeText={setCantidad}
              keyboardType="numeric"
              style={styles.input}
            />
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button onPress={onClose}>Cancelar</Button>
            <Button mode="contained" onPress={handleAddToCart} disabled={!cantidad || parseInt(cantidad, 10) <= 0}>
              Agregar
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
};

export default ProductQuantityModal;

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
    paddingBottom: 16,
  },
  infoText: {
    marginBottom: 8,
  },
  input: {
    marginTop: 12,
  },
  actions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});
