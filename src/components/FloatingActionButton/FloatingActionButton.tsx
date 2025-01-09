import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface FloatingActionButtonProps {
  onPress: () => void;
  iconName: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Icon name={iconName} size={28} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 80, // Ajusta la altura para estar por encima de la barra de navegación
    right: 20,
    backgroundColor: '#03DAC4', // Color Primario
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FloatingActionButton;
