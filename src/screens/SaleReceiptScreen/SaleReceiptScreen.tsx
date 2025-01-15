import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Text, Button, Card, Divider, useTheme } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const SaleReceiptScreen = () => {
  const { colors } = useTheme();
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { saleId } = route.params;

  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState<any>(null);

  // Cargar datos de la venta
  useEffect(() => {
    const fetchSale = async () => {
      try {
        const docRef = doc(db, 'ventas', saleId);
        const saleSnapshot = await getDoc(docRef);

        if (saleSnapshot.exists()) {
          setSale(saleSnapshot.data());
        } else {
          console.error('No se encontró la venta.');
        }
      } catch (error) {
        console.error('Error al cargar la venta:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSale();
  }, [saleId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (!sale) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar la información de la venta.</Text>
        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
          Regresar
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Comprobante de Venta" titleStyle={styles.title} />
        <Card.Content>
          <Text style={styles.infoText}>
            <Text style={styles.label}>ID de la Venta: </Text>
            {saleId}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Fecha: </Text>
            {sale.fecha.toDate().toLocaleString()}
          </Text>
          <Divider style={styles.divider} />
          <Text style={styles.sectionTitle}>Productos:</Text>
          <FlatList
            data={sale.items}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>{item.nombre}</Text>
                <Text style={styles.itemQty}>x {item.cantidad}</Text>
                <Text style={styles.itemPrice}>S/{(item.cantidad * item.precio).toFixed(2)}</Text>
              </View>
            )}
          />
          <Divider style={styles.divider} />
          <Text style={styles.totalText}>
            <Text style={styles.label}>Total: </Text>
            S/{sale.total.toFixed(2)}
          </Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={[styles.button, { backgroundColor: colors.primary }]}
        icon="check-circle"
      >
        Finalizar
      </Button>
    </View>
  );
};

export default SaleReceiptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    marginBottom: 24,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  label: {
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    flex: 2,
    fontSize: 16,
    color: '#333',
  },
  itemQty: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  itemPrice: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: '#333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: 12,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#ddd',
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 8,
  },
});
