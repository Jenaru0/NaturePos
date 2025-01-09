import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    padding: 16, // Mayor padding para contenido espacioso
    marginVertical: 8, // Separación más uniforme entre tarjetas
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderRadius: 12, // Bordes más redondeados
    shadowColor: '#000', // Sombra para profundidad
    shadowOffset: { width: 0, height: 4 }, // Sombra sutil y realista
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Elevación en Android para sombra
    borderColor: '#76F7BF', // Borde suave (Aqua Medio)
    borderWidth: 1, // Borde para resaltar la tarjeta
  },
  text: {
    fontSize: 16, // Tamaño estándar para texto
    fontWeight: '500', // Peso seminegrita para destacar el texto
    color: '#212121', // Texto en gris oscuro para contraste
  },
  deleteButton: {
    backgroundColor: '#DA0319', // Rojo vivid para destacar el botón de eliminar
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 8, // Bordes redondeados para consistencia
    elevation: 3, // Sombra para botones en Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF', // Texto blanco para contraste
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentRow: {
    flexDirection: 'row', // Elementos alineados horizontalmente
    justifyContent: 'space-between', // Espaciado entre texto y botón
    alignItems: 'center',
  },
});
