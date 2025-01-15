// services/products.ts
import { db } from './firebase';
import { collection, addDoc, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Product } from '../types/Product';

export async function createProduct(product: Product) {
  return addDoc(collection(db, 'productos'), product);
}

export async function getProduct(productId: string) {
  const productRef = doc(db, 'productos', productId);
  const productSnap = await getDoc(productRef);
  return productSnap.exists() ? (productSnap.data() as Product) : null;
}

export async function updateProduct(productId: string, product: Product) {
  const productRef = doc(db, 'productos', productId);
  return updateDoc(productRef, { ...product });
}

export async function deleteProduct(productId: string) {
  const productRef = doc(db, 'productos', productId);
  return deleteDoc(productRef);
}
