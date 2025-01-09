import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatingCartButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name="cart-outline" size={28} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 80, // Ajusta la altura según la barra de navegación
    right: 20,
    backgroundColor: '#76F7BF', // Color principal del botón (morado)
    borderRadius: 30, // Bordes completamente redondeados
    width: 60, // Ancho del botón
    height: 60, // Altura del botón
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 }, // Sombra desplazada hacia abajo
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Elevación para sombra en Android
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingCartButton;
