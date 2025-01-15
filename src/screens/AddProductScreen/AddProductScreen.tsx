// src/screens/AddProductScreen.tsx

import React from 'react';
import { View, Alert } from 'react-native';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { NavigationProp } from '@react-navigation/native';
import ProductForm from '../../components/ProductForm/ProductForm';
import styles from './styles';
import { Product } from '../../types/Product';

const AddProductScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const handleSave = async (product: Product) => {
    try {
      // 1) Creas el doc en Firestore. Firestore asigna un ID aleatorio.
      const docRef = await addDoc(collection(db, 'productos'), {
        ...product,
        // Podrías poner id: '' temporalmente o simplemente no poner 'id' aquí:
        // id: '',
      });

      // 2) docRef.id es el ID verdadero del documento en Firestore
      //    Actualiza el campo 'id' dentro del doc para que coincida.
      await updateDoc(docRef, { id: docRef.id });

      Alert.alert('Éxito', 'Producto agregado correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar el producto.');
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ProductForm onSave={handleSave} />
    </View>
  );
};

export default AddProductScreen;
