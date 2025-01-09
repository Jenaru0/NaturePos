import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ProductFilterProps {
  productos: any[];
  onFilter: (filteredProducts: any[]) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ productos, onFilter }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filterProducts = useCallback(({ text, category }: { text: string; category: string }) => {
    const filtered = productos.filter(
      product =>
        product.nombre?.toLowerCase().includes(text.toLowerCase()) &&
        (category ? product.categoria === category : true),
    );
    onFilter(filtered);
  }, [productos, onFilter]);

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
    filterProducts({ text, category: selectedCategory });
  }, [filterProducts, selectedCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    filterProducts({ text: searchText, category });
  }, [filterProducts, searchText]);

  return (
    <View style={styles.filterContainer}>
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
            onPress={() => handleCategoryChange(category === 'Todos' ? '' : category)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCategory === category && styles.activeFilterText,
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#F5F5F5', // Fondo Gris Claro
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  categoryFilters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#03DAC4', // Color Primario
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  activeFilter: {
    backgroundColor: '#91F9E5', // Fondo Aqua Claro
  },
  filterButtonText: {
    color: '#03DAC4', // Color Primario
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF', // Texto Blanco
  },
});

export default ProductFilter;
