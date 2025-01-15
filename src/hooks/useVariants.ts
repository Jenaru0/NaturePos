import { useState, useCallback } from 'react';

interface Variante {
  nombre: string;
  capacidad: number;
  precio: number;
  stock: number;
}

const useVariants = (initialVariants: Variante[] = [], totalStock: number, unidadesPorContenedor: number) => {
  const [variantes, setVariantes] = useState<Variante[]>(initialVariants);

  const calculateStock = useCallback((capacidad: number) => {
    if (!unidadesPorContenedor) {
      return 0;
    }
    return Math.floor(totalStock / unidadesPorContenedor) * capacidad;
  }, [totalStock, unidadesPorContenedor]);

  const addVariante = useCallback((nombre: string, capacidad: number, precio: number) => {
    const stock = calculateStock(capacidad);
    setVariantes(prevVariantes => [
      ...prevVariantes,
      { nombre, capacidad, precio, stock },
    ]);
  }, [calculateStock]);

  const deleteVariante = useCallback((index: number) => {
    setVariantes(prevVariantes => prevVariantes.filter((_, i) => i !== index));
  }, []);

  return { variantes, addVariante, deleteVariante };
};

export default useVariants;

