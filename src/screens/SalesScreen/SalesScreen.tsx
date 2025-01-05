import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Button, Text, Card} from 'react-native-paper';
import {registrarVenta} from '../../services/sales';

const SalesScreen = ({navigation}: {navigation: any}) => {
  const handleVenta = async () => {
    const venta = {
      producto: 'Pan Integral',
      cantidad: 2,
      total: 10,
      fecha: new Date().toISOString(),
    };

    try {
      await registrarVenta(venta);
      Alert.alert('Éxito', 'Venta registrada con éxito');
    } catch (error) {
      Alert.alert('Error', 'Error al registrar la venta');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Pantalla de Ventas
      </Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text>Producto: Pan Integral</Text>
          <Text>Cantidad: 2</Text>
          <Text>Total: S/10</Text>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={handleVenta} style={styles.button}>
        Registrar Venta
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Inventario')}
        style={styles.button}>
        Ir al Inventario
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
});

export default SalesScreen;
