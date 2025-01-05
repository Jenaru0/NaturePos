import {db} from './firebase';
import {collection, addDoc} from 'firebase/firestore';

export const registrarVenta = async venta => {
  try {
    const docRef = await addDoc(collection(db, 'ventas'), venta);
    console.log('Venta registrada con ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Error al registrar la venta:', error);
    throw error;
  }
};
