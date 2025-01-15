// hooks/useValidation.ts

import { useState, useCallback } from 'react';

/** La interfaz de las variantes que usaremos para validar.
 *  Podrías ajustarla si necesitas “stock” en la variante.
 */
interface VariantForValidation {
  nombre: string;
  capacidad: number;
  precio: number;
  // stock?: number; si lo necesitaras
}

export interface ValidationParams {
  /** Campos básicos */
  nombre: string;
  categoria: string;
  nuevaCategoria: string; // si no la usas, pásalo como 
  stock: string;         // Se recibe como string desde los <TextInput>
  precio: string;        // igual, viene como string
  /** Switch: si el producto tiene variantes */
  tieneVariantes: boolean;
  /** 
   * Solo se valida si tieneVariantes = true. 
   * Representa la “unidades por contenedor” que ingresa el usuario.
   */
  unidadesPorContenedor?: string;
  /** 
   * Variantes a validar. 
   * Si no hay variantes, pasa un array vacío.
   */
  variantes: VariantForValidation[];
}

interface ValidationErrors {
  nombre: string;
  categoria: string;
  stock: string;
  precio: string;
  unidadesPorContenedor?: string; 
  variantes?: string;
}

/** 
 * Hook de validación. 
 * Ejemplo: lo usas en ProductForm para verificar que stock >= 0, etc.
 */
const useValidation = ({
  nombre,
  categoria,
  nuevaCategoria,
  stock,
  precio,
  tieneVariantes,
  unidadesPorContenedor,
  variantes,
}: ValidationParams) => {
  const [errors, setErrors] = useState<ValidationErrors>({
    nombre: '',
    categoria: '',
    stock: '',
    precio: '',
  });

  /** Función auxiliar para ver si un string es un número >= 0 */
  const isValidNumber = (value: string): boolean => {
    const num = Number(value);
    return !isNaN(num) && num >= 0;
  };

  const validateForm = useCallback(() => {
    let hasError = false;
    const newErrors: ValidationErrors = {
      nombre: '',
      categoria: '',
      stock: '',
      precio: '',
    };

    // 1) Nombre obligatorio
    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre del producto es obligatorio.';
      hasError = true;
    }

    // 2) Categoría o nuevaCategoria
    if (!categoria && !nuevaCategoria.trim()) {
      newErrors.categoria = 'Selecciona o ingresa una categoría.';
      hasError = true;
    }

    // 3) Stock >= 0
    if (!stock || !isValidNumber(stock)) {
      newErrors.stock = 'El stock debe ser un número válido mayor o igual a 0.';
      hasError = true;
    }

    // 4) Precio >= 0
    if (!precio || !isValidNumber(precio)) {
      newErrors.precio = 'El precio debe ser un número válido mayor o igual a 0.';
      hasError = true;
    }

    // 5) Si tieneVariantes, validamos campos extra
    if (tieneVariantes) {
      // (a) unidadesPorContenedor
      if (!unidadesPorContenedor || !isValidNumber(unidadesPorContenedor)) {
        newErrors.unidadesPorContenedor =
          'Unidades por contenedor debe ser un número válido mayor o igual a 0.';
        hasError = true;
      }

      // (b) Variantes
      // Ejemplo: Forzamos a que al menos haya 1 variante 
      // (puedes cambiar la regla si deseas).
      if (variantes.length === 0) {
        newErrors.variantes = 'Debes agregar al menos una variante.';
        hasError = true;
      }
    }

    setErrors(newErrors);
    return !hasError;
  }, [
    nombre,
    categoria,
    nuevaCategoria,
    stock,
    precio,
    tieneVariantes,
    unidadesPorContenedor,
    variantes,
  ]);

  return { errors, validateForm };
};

export default useValidation;
