import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const addCategory = async (newCategory: string): Promise<void> => {
  const categoriasRef = collection(db, 'categorias');
  await addDoc(categoriasRef, { nombre: newCategory });
};

const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']); // Actualiza las categorías
    },
  });
};

export default useAddCategory;
