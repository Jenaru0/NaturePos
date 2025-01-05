import {db} from './firebase';
import {collection, addDoc} from 'firebase/firestore';

export const agregarProducto = async producto => {
  try {
    const docRef = await addDoc(collection(db, 'productos'), producto);
    console.log('Producto agregado con ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    throw error;
  }
};
