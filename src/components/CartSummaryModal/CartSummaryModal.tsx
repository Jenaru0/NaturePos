// components/CartSummaryModal.tsx
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { useCart } from '../../context/CartContext';

interface Props {
  onClose: () => void;
}

const CartSummaryModal: React.FC<Props> = ({ onClose }) => {
  const { items, getTotalAmount, removeItem, clearCart } = useCart();

  const total = getTotalAmount();

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleConfirmSale = () => {
    // Aquí podrías guardar la venta en Firestore, generar un ID, etc.
    // Luego podrías mostrar un "ticket" (por ejemplo, cambiar a una pantalla "SaleReceiptScreen").
    // Por ahora, lo haremos simple:
    console.log('Venta confirmada. Items:', items);
    // Limpia el carrito:
    clearCart();
    // Cierra el modal:
    onClose();
    // Podrías navegar a un "SaleReceiptScreen" si deseas.
  };

  return (
    <View style={styles.overlay}>
      <Card style={styles.card}>
        <Card.Title title="Resumen de la Venta" />
        <Card.Content style={styles.content}>
          {items.length === 0 ? (
            <Text>No hay productos en el carrito</Text>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => item.productId}
              renderItem={({ item }) => (
                <View style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.nombre}</Text>
                  <Text style={styles.itemQty}>x{item.cantidad}</Text>
                  <Text style={styles.itemPrice}>S/ {(item.precio * item.cantidad).toFixed(2)}</Text>
                  <Button
                    mode="text"
                    onPress={() => handleRemoveItem(item.productId)}
                  >
                    Eliminar
                  </Button>
                </View>
              )}
            />
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total: </Text>
            <Text style={styles.totalValue}>S/ {total.toFixed(2)}</Text>
          </View>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button onPress={onClose}>Cerrar</Button>
          {items.length > 0 && (
            <Button mode="contained" onPress={handleConfirmSale}>
              Confirmar Venta
            </Button>
          )}
        </Card.Actions>
      </Card>
    </View>
  );
};

export default CartSummaryModal;

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
  content: {
    maxHeight: 400, // limit the list height
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    justifyContent: 'space-between',
  },
  itemName: {
    flex: 2,
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemQty: {
    flex: 1,
    textAlign: 'center',
  },
  itemPrice: {
    flex: 1,
    textAlign: 'right',
    marginRight: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
