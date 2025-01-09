import { useState, useCallback } from 'react';

interface ValidationParams {
  nombre: string;
  categoria: string;
  nuevaCategoria: string;
  stock: string;
  precio: string;
  tieneVariantes: boolean;
  variantes: Array<{ nombre: string; capacidad: number; precio: number; stock: number }>;
}

interface ValidationErrors {
  nombre: string;
  categoria: string;
  stock: string;
  precio: string;
  variantes?: string;
}

const useValidation = ({
  nombre,
  categoria,
  nuevaCategoria,
  stock,
  precio,
  tieneVariantes,
  variantes,
}: ValidationParams) => {
  const [errors, setErrors] = useState<ValidationErrors>({
    nombre: '',
    categoria: '',
    stock: '',
    precio: '',
  });

  const isValidNumber = (value: string): boolean => {
    const number = Number(value);
    return !isNaN(number) && number >= 0;
  };

  const validateForm = useCallback(() => {
    let hasError = false;
    const newErrors: ValidationErrors = { nombre: '', categoria: '', stock: '', precio: '' };

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre del producto es obligatorio.';
      hasError = true;
    }

    if (!categoria && !nuevaCategoria.trim()) {
      newErrors.categoria = 'Selecciona o ingresa una categoría.';
      hasError = true;
    }

    if (!stock || !isValidNumber(stock)) {
      newErrors.stock = 'El stock debe ser un número válido mayor o igual a 0.';
      hasError = true;
    }

    if (!precio || !isValidNumber(precio)) {
      newErrors.precio = 'El precio debe ser un número válido mayor o igual a 0.';
      hasError = true;
    }

    if (tieneVariantes) {
      const totalVariantStock = variantes.reduce((sum, variant) => sum + variant.stock, 0);
      if (totalVariantStock > Number(stock)) {
        newErrors.variantes = 'El stock de variantes no puede exceder el stock principal.';
        hasError = true;
      }
    }

    setErrors(newErrors);
    return !hasError;
  }, [nombre, categoria, nuevaCategoria, stock, precio, tieneVariantes, variantes]);

  return { errors, validateForm };
};

export default useValidation;

