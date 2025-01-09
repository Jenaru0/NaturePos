export interface Product {
  nombre: string;
  categoria: string;
  nuevaCategoria?: string;
  stock: number;
  precio: number;
  tipoProducto?: string | null;
  unidadesPorContenedor?: number | null;
  variantes?: Array<{
    nombre: string;
    capacidad: number;
    precio: number;
    stock: number;
  }>;
}
