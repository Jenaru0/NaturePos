import { db } from './services/firebase'; // Asegúrate de que esta ruta sea correcta
import { collection, addDoc } from 'firebase/firestore';

const generateProducts = () => {
  const products = [];

  for (let i = 1; i <= 25; i++) {
    if (i % 2 === 0) {
      products.push({
        categoria: '4H5KjUCXLxxnPCAIoHcq',
        imagen: '',
        nombre: `Producto con variantes ${i}`,
        precio: 10,
        stock: 50,
        tipoProducto: 'Bolsa',
        unidadesPorContenedor: 50,
        variantes: [
          { capacidad: 25, nombre: 'Media bolsa', precio: 5, stock: 25 },
          { capacidad: 50, nombre: 'Bolsa completa', precio: 10, stock: 25 },
        ],
      });
    } else {
      products.push({
        categoria: 'ZxEpZ8SEBAW40japW2qz',
        imagen: '',
        nombre: `Producto sin variantes ${i}`,
        precio: 10,
        stock: 50,
        tipoProducto: null,
        unidadesPorContenedor: null,
        variantes: [],
      });
    }
  }

  return products;
};

const addProductsToFirestore = async () => {
  const products = generateProducts();
  const productsCollection = collection(db, 'productos'); // Cambié la colección a "productos"

  try {
    for (const product of products) {
      await addDoc(productsCollection, product);
      console.log(`Producto ${product.nombre} agregado.`);
    }
    console.log('Todos los productos fueron agregados correctamente.');
  } catch (error) {
    console.error('Error al agregar productos:', error);
  }
};

// Ejecuta automáticamente cuando corras el archivo
addProductsToFirestore();
