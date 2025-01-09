import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderRadius: 12, // Bordes redondeados para diseño moderno
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000', // Sombra para profundidad
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6, // Elevación para sombra en Android
    borderColor: '#76F7BF', // Aqua Medio como borde decorativo
    borderWidth: 1, // Borde para resaltar la tarjeta
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12, // Bordes redondeados para imágenes
    marginBottom: 12,
    resizeMode: 'cover', // Para asegurar proporciones correctas
  },
  productName: {
    fontSize: 16,
    fontWeight: '600', // Negrita ligera para mejor apariencia
    textAlign: 'center',
    color: '#212121', // Gris oscuro para texto
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#03DAC4', // Teal Claro como acento para precio
    textAlign: 'center',
    fontWeight: 'bold', // Resalta el precio
    marginBottom: 8,
  },
  productStock: {
    fontSize: 12,
    color: '#3F4531', // Oliva Oscuro para texto secundario
    textAlign: 'center',
    marginBottom: 8,
  },
  variantsContainer: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#F5F5F5', // Fondo gris claro para resaltar variantes
    borderRadius: 8,
    padding: 10,
  },
  variantText: {
    fontSize: 12,
    color: '#212121', // Texto en gris oscuro
  },
  moreVariantsText: {
    fontSize: 12,
    color: '#03DAC4', // Teal Claro para el texto de más variantes
    textAlign: 'center',
    marginTop: 10,
  },
  lowStock: {
    borderColor: '#DA0319', // Rojo vivid para indicar stock bajo
    borderWidth: 2,
  },
});
