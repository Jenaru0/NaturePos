import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Product } from '../../types/Product';
import { db } from '../../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductQuantityModal from '../../components/ProductQuantityModal/ProductQuantityModal';
import VariantSelectionModal from '../../components/VariantSelectionModal/VariantSelectionModal';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type SalesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SalesScreen'>;

const SalesScreen = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const { getTotalQuantity } = useCart();
  const navigation = useNavigation<SalesScreenNavigationProp>();

  // Cargar productos desde Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'productos'), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProductos(items);
    });

    return () => unsubscribe();
  }, []);

  // Manejar la selección del producto
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);

    if (product.variantes && product.variantes.length > 0) {
      // Producto con variantes -> Abrir VariantSelectionModal
      setShowVariantModal(true);
    } else {
      // Producto sin variantes -> Abrir ProductQuantityModal
      setShowQuantityModal(true);
    }
  };

  // Cerrar ambos modales
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowQuantityModal(false);
    setShowVariantModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Lista de productos */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id ?? ''} // Proporciona un valor predeterminado
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductSelect(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal para productos sin variantes */}
      {selectedProduct && showQuantityModal && (
        <ProductQuantityModal
          visible={showQuantityModal}
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      {/* Modal para productos con variantes */}
      {selectedProduct && showVariantModal && (
        <VariantSelectionModal
          visible={showVariantModal}
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      {/* FAB para ver el carrito */}
      <FloatingActionButton
        iconName="cart"
        label={getTotalQuantity() > 0 ? `${getTotalQuantity()}` : ''}
        onPress={() => navigation.navigate('ViewCartScreen')} // Navegar a la pantalla de carrito
      />
    </View>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80,
  },
  listContent: {
    paddingBottom: 80,
  },
});
