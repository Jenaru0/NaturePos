import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useCart } from '../../context/CartContext';
import { db } from '../../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import CartItem from '../../components/CartItem/CartItem';

type ViewCartNavProp = StackNavigationProp<RootStackParamList, 'ViewCartScreen'>;

const ViewCartScreen = () => {
  const navigation = useNavigation<ViewCartNavProp>();
  const { items, getTotalAmount, removeItem, clearCart, restoreStock } = useCart();

  const handleConfirmSale = async () => {
    try {
      const ventaData = {
        fecha: Timestamp.now(),
        items: [...items],
        total: getTotalAmount(),
      };

      const docRef = await addDoc(collection(db, 'ventas'), ventaData);
      clearCart();

      Alert.alert('Venta confirmada', 'Se ha registrado la venta.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SaleReceiptScreen', { saleId: docRef.id }),
        },
      ]);
    } catch (error) {
      console.error('Error al confirmar la venta:', error);
      Alert.alert('Error', 'No se pudo registrar la venta. Intente nuevamente.');
    }
  };

  const handleCancelSale = async () => {
    try {
      await restoreStock();
      Alert.alert('Venta cancelada', 'El stock ha sido restaurado.');
    } catch (error) {
      console.error('Error al cancelar la venta:', error);
      Alert.alert('Error', 'No se pudo restaurar el stock. Intente nuevamente.');
    }
  };

  const renderItem = useCallback(({ item, index }: any) => {
    const subTotal = item.cantidad * item.precio;

    return (
      <CartItem
        item={item}
        subTotal={subTotal}
        onRemove={() => removeItem(index)}
      />
    );
  }, [removeItem]);

  const total = getTotalAmount();

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>El carrito está vacío</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(_, i) => String(i)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Text style={styles.totalText}>Total: S/{total.toFixed(2)}</Text>

      <Button
        mode="contained"
        onPress={handleConfirmSale}
        style={styles.confirmButton}
        disabled={items.length === 0}
      >
        Confirmar Venta
      </Button>

      <Button
        mode="text"
        onPress={handleCancelSale}
        style={styles.cancelButton}
        disabled={items.length === 0}
      >
        Cancelar Venta
      </Button>
    </View>
  );
};

export default ViewCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
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
  totalText: {
    marginVertical: 16,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  confirmButton: {
    marginTop: 8,
  },
  cancelButton: {
    marginTop: 8,
    backgroundColor: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#999',
  },
});
