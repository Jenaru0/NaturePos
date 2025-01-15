import React, { createContext, useContext, useState } from 'react';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../services/firebase';

interface CartItem {
  productId: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

interface CartContextProps {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  restoreStock: () => Promise<void>;
  getTotalQuantity: () => number;
  getTotalAmount: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item]);
  };

  const removeItem = async (index: number) => {
    const removedItem = items[index];
    if (!removedItem) {
      return;
    }

    await runTransaction(db, async (transaction) => {
      const productRef = doc(db, 'productos', removedItem.productId);
      const productSnapshot = await transaction.get(productRef);
      const currentStock = productSnapshot.data()?.stock ?? 0;
      transaction.update(productRef, { stock: currentStock + removedItem.cantidad });
    });

    setItems((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const clearCart = () => setItems([]);

  const restoreStock = async () => {
    for (const item of items) {
      await runTransaction(db, async (transaction) => {
        const productRef = doc(db, 'productos', item.productId);
        const productSnapshot = await transaction.get(productRef);
        const currentStock = productSnapshot.data()?.stock ?? 0;
        transaction.update(productRef, { stock: currentStock + item.cantidad });
      });
    }
    clearCart();
  };

  const getTotalQuantity = () => items.reduce((sum, it) => sum + it.cantidad, 0);
  const getTotalAmount = () => items.reduce((sum, it) => sum + it.cantidad * it.precio, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, restoreStock, getTotalQuantity, getTotalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
