export interface EditProductScreenProps {
  navigation: any;
  route: {
    params: {
      productId: string;
    };
  };
}

export interface Product {
  nombre: string;
  categoria: string | null;
  stock: number | null;
  precio: number | null;
  variantes: Variant[];
}

export interface Category {
  id: string;
  nombre: string;
}

export interface Variant {
  nombre: string;
  capacidad: number;
  precio: number;
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
