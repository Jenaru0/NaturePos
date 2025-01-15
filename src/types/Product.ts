// types/Product.ts

export interface Variant {
  nombre: string;
  capacidad: number;   // p. ej. 14 (media bolsa)
  precio: number;      // p. ej. 30 soles
  dependeDeApertura?: boolean;
}

export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  imagen?: string;

  // Manejo de “¿Tiene Variantes?”
  tipoProducto?: string | null; // p.ej. “Bolsa” o “Caja”
  variantes?: Variant[]; // lista de sub-porciones

  // Stock normal
  stock: number;        // contenedores sellados
  precio: number;       // precio del contenedor sellado

  // Manejo de contenedores abiertos
  contenedoresAbiertos?: number | null;
  unidadesAbiertasDisponibles?: number | null;
  unidadesPorContenedor?: number | null;

  // Si no tiene variantes, no usas lo anterior
}
