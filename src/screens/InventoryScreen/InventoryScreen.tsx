import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {db} from '../../services/firebase';
import {collection, onSnapshot} from 'firebase/firestore';
import {Button} from 'react-native-paper';

const InventoryScreen = ({navigation}) => {
  const [productos, setProductos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'productos'), snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(items);
      setFilteredProducts(items);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = text => {
    setSearchText(text);
    filterProducts(text, selectedCategory);
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    filterProducts(searchText, category);
  };

  const filterProducts = (text, category) => {
    const filtered = productos.filter(
      product =>
        product.nombre?.toLowerCase().includes(text.toLowerCase()) &&
        (category ? product.categoria === category : true),
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar producto..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <View style={styles.categoryFilters}>
        {['Todos', 'Suplementos', 'Panes'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.activeFilter,
            ]}
            onPress={() =>
              handleCategoryChange(category === 'Todos' ? '' : category)
            }>
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={[styles.productItem, item.cantidad < 5 && styles.lowStock]}>
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text>Categoría: {item.categoria}</Text>
            <Text>Stock: {item.cantidad}</Text>
            {item.variantes && item.variantes.length > 0 ? (
              item.variantes.map((variante, index) => (
                <View key={index} style={styles.variantItem}>
                  <Text>Variante: {variante.nombre}</Text>
                  <Text>Cantidad: {variante.cantidad}</Text>
                  <Text>Precio: S/{variante.precio}</Text>
                </View>
              ))
            ) : (
              <Text>Precio: S/{item.precio}</Text>
            )}
          </View>
        )}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddProduct')}>
        Agregar Producto
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  categoryFilters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  activeFilter: {backgroundColor: '#03dac4'},
  productItem: {padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'},
  lowStock: {backgroundColor: '#ffcccb'},
  variantItem: {paddingLeft: 10, paddingTop: 5},
  productName: {fontSize: 18, fontWeight: 'bold'},
});

export default InventoryScreen;
