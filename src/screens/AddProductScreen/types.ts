export interface Product {
  nombre: string;
  categoria: string;
  nuevaCategoria?: string;
  stock: string;
  precio: string;
  variantes?: Array<{
    nombre: string;
    capacidad: number;
    precio: number;
    stock?: number;
  }>;
}
  export interface Category {
    id: string;
    nombre: string;
  }
  export interface Variant {
    nombre: string;
    capacidad: number;
    precio: number;
    stock?: number; // Added stock as optional
  }
  export interface Errors {
    nombre: string;
    categoria: string;
    stock: string;
    precio: string;
    nombreVariante?: string;
    capacidadVariante?: string;
    precioVariante?: string;
    variantes?: string;
  }
  export interface ProductFormProps {
    initialProduct?: Product;
    onSave: (product: Product) => void;
    onDelete?: () => void;
    categorias: Category[];
  }
