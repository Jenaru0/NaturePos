import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { db } from '../../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { NavigationProp } from '@react-navigation/native';
import ProductCard from '../../components/ProductCard/ProductCard';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';

const SalesScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  interface Producto {
    id: string;
    // add other properties of Producto here
  }

  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'productos'), snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(items);
    });

    return () => unsubscribe();
  }, []);

  const handleViewCartPress = () => {
    navigation.navigate('ViewCart');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={styles.flatListContent}
      />
      <FloatingActionButton onPress={handleViewCartPress} iconName="cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingBottom: 80 }, // Añadir paddingBottom para espacio adicional
  flatListContent: { paddingBottom: 80 }, // Añadir paddingBottom para espacio adicional
});

export default SalesScreen;
