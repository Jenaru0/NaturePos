// components/FloatingActionButton/FloatingActionButton.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';

/**
 * Props para nuestro FAB personalizado
 */
interface FABProps {
  onPress: () => void;
  iconName: string;  // Nombre del ícono (de MaterialCommunityIcons)
  label?: string;    // Texto opcional a mostrar en el FAB
}

const FloatingActionButton: React.FC<FABProps> = ({
  onPress,
  iconName,
  label,
}) => {
  return (
    <View style={styles.container}>
      <FAB
        icon={iconName}
        onPress={onPress}
        style={styles.fab}
        label={label}
        small={false}
      />
    </View>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 80,
  },
  fab: {
    // Aquí puedes personalizar más estilos
  },
});
