import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { db } from '../../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { NavigationProp } from '@react-navigation/native';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';

const InventoryScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  interface Producto {
    id: string;
    nombre?: string;
    categoria?: string;
    stock?: number;
    presentaciones?: { nombre: string; capacidad: number; precio: number; stock: number }[];
    precio?: number;
    imagen?: string;
  }

  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'productos'), snapshot => {
      const items = snapshot.docs.map(document => ({
        id: document.id,
        ...document.data(),
      }));
      setProductos(items);
      setFilteredProducts(items);
    });

    return () => unsubscribe();
  }, []);

  const handleAddProductPress = () => {
    navigation.navigate('AddProduct');
  };

  const handleEditProductPress = (productId: string) => {
    navigation.navigate('EditProduct', { productId });
  };



  const renderProductCard = ({ item }: { item: Producto }) => (
    <ProductCard
      product={item}
      onPress={() => handleEditProductPress(item.id)}
      showVariants={true}
      highlightLowStock={true}
    />
  );

  return (
    <View style={styles.container}>
      <ProductFilter productos={productos} onFilter={setFilteredProducts} />
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={renderProductCard}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
      />
      <FloatingActionButton onPress={handleAddProductPress} iconName="add" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingBottom: 80 },
  flatListContent: { paddingBottom: 80 },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default InventoryScreen;
