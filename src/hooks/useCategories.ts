import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

const fetchCategories = async () => {
  const categoriasRef = collection(db, 'categorias');
  const categoriasSnap = await getDocs(categoriasRef);
  return categoriasSnap.docs.map((doc) => ({
    id: doc.id,
    nombre: doc.data().nombre,
  }));
};

const useCategories = () => {
  return useQuery(['categories'], fetchCategories, {
    staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos
    refetchOnWindowFocus: false, // No recarga al volver a la ventana
  });
};

export default useCategories;
