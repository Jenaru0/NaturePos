// hooks/useCategories.ts
import { useState, useEffect, useCallback } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export interface Category { id: string; nombre: string; }

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const snapshot = await getDocs(collection(db, 'categorias'));
      const cats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
      setCategories(cats);
    } catch (err) {
      setError('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const createNewCategory = useCallback(async (nombreCategoria: string) => {
    const docRef = await addDoc(collection(db, 'categorias'), {
      nombre: nombreCategoria,
    });
    // Añadirla al array local
    setCategories(prev => [...prev, { id: docRef.id, nombre: nombreCategoria }]);
    return docRef.id;
  }, []);

  return {
    categories,
    loading,
    error,
    createNewCategory,
    refetch: fetchAllCategories, // opcional, si quisieras refrescar
  };
}
