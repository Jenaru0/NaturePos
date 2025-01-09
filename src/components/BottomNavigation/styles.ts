import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute', // Posición flotante
    bottom: 10, // Altura desde la parte inferior
    left: 15, // Espaciado lateral izquierdo
    right: 15, // Espaciado lateral derecho
    backgroundColor: '#03DAC4', // Fondo Teal Claro
    borderRadius: 25, // Bordes redondeados para diseño moderno
    height: 65, // Altura de la barra
    shadowColor: '#000', // Sombra para profundidad
    shadowOffset: { width: 0, height: 5 }, // Desplazamiento de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 10, // Radio de la sombra
    elevation: 10, // Elevación para Android
    borderTopWidth: 0, // Eliminar borde superior
  },
  tabBarIcon: {
    width: 24, // Ancho del icono
    height: 24, // Altura del icono
  },
  tabBarLabel: {
    fontSize: 12, // Tamaño de la fuente
    fontWeight: 'bold', // Peso del texto
    marginBottom: 5, // Margen inferior para separación
    color: '#FFFFFF', // Texto Blanco para contraste
  },
  activeTabIcon: {
    tintColor: '#FFFFFF', // Íconos seleccionados en blanco brillante
  },
  inactiveTabIcon: {
    tintColor: 'rgba(255, 255, 255, 0.7)', // Íconos no seleccionados en blanco tenue
  },
});
