import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { NavigationProp } from '@react-navigation/native';
import ProductForm from '../../components/ProductForm/ProductForm';
import styles from './styles';
import { Product } from '../../types/Product'; // Import the Product interface

const EditProductScreen = ({ navigation, route }: { navigation: NavigationProp<any>, route: any }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null); // Use the Product interface

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'productos', productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct(productSnap.data() as Product); // Cast the data to Product
        }
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al cargar el producto.');
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSave = async (updatedProduct: Product) => { // Use the Product interface
    try {
      const productRef = doc(db, 'productos', productId);
      await updateDoc(productRef, { ...updatedProduct }); // Spread the updatedProduct to match the expected structure
      Alert.alert('Éxito', 'Producto actualizado correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar el producto.');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const productRef = doc(db, 'productos', productId);
      await deleteDoc(productRef);
      Alert.alert('Éxito', 'Producto eliminado correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al eliminar el producto.');
      console.error(error);
    }
  };

  if (!product) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <ProductForm initialProduct={product} onSave={handleSave} onDelete={handleDelete} />
    </View>
  );
};

export default EditProductScreen;
