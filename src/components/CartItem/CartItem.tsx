import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

interface CartItemProps {
  item: {
    nombre: string;
    cantidad: number;
    precio: number;
  };
  subTotal: number;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, subTotal, onRemove }) => {
  return (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>{item.nombre}</Text>
      <Text style={styles.itemQty}>x {item.cantidad}</Text>
      <Text style={styles.itemPrice}>S/{subTotal.toFixed(2)}</Text>
      <Button mode="text" onPress={onRemove}>
        Quitar
      </Button>
    </View>
  );
};

export default React.memo(CartItem);

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'space-between',
  },
  itemName: {
    flex: 2,
    fontWeight: '600',
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
});
