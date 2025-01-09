import React from 'react';
import { View, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { NavigationProp } from '@react-navigation/native';
import ProductForm from '../../components/ProductForm/ProductForm';
import styles from './styles';
import { Product } from '../../types/Product'; // Import the Product interface

const AddProductScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  /**
   * Maneja la acción de guardar un producto en Firebase.
   * @param product - Datos del producto a guardar.
   */
  const handleSave = async (product: Product) => {
    try {
      await addDoc(collection(db, 'productos'), product);
      Alert.alert('Éxito', 'Producto agregado correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar el producto.');
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Renderiza el formulario para agregar un producto */}
      <ProductForm onSave={handleSave} />
    </View>
  );
};

export default AddProductScreen;
