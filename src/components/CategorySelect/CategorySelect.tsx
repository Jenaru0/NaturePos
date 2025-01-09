import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Menu,
  Button,
  TextInput,
  ActivityIndicator,
  HelperText,
} from 'react-native-paper';

interface Category {
  id: string;
  nombre: string;
}

interface CategorySelectProps {
  categoriaSeleccionada: string;
  onChangeCategoria: (categoriaId: string) => void;
}

// Simulación de un fetch de categorías
const fetchCategoriesFromDB = async (): Promise<Category[]> => {
  // Aquí harías tu llamada a la API/DB, usando fetch o axios, por ejemplo:
  // const response = await axios.get('/api/categories');
  // return response.data;
  // Simulamos datos:
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 'c1', nombre: 'Bebidas' },
        { id: 'c2', nombre: 'Snacks' },
        { id: 'c3', nombre: 'Lácteos' },
      ]);
    }, 1000)
  );
};

// Simulación de crear una categoría
const createCategoryInDB = async (nombreCategoria: string): Promise<Category> => {
  // Llamada real a la API:
  // const response = await axios.post('/api/categories', { nombre: nombreCategoria });
  // return response.data;

  // Simulamos el retorno con un ID aleatorio:
  return new Promise((resolve) =>
    setTimeout(() => {
      const newCategory: Category = {
        id: Math.random().toString(36).substr(2, 9),
        nombre: nombreCategoria,
      };
      resolve(newCategory);
    }, 1000)
  );
};

const CategorySelect: React.FC<CategorySelectProps> = ({
  categoriaSeleccionada,
  onChangeCategoria,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState('');

  // Cargar categorías al montar el componente
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchCategoriesFromDB();
        setCategories(data);
      } catch (err) {
        setError('Error al cargar categorías');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Maneja la selección de categoría
  const handleSelectCategory = (category: Category) => {
    onChangeCategoria(category.id);
    setMenuVisible(false);
  };

  // Maneja la apertura del formulario para crear una categoría
  const handleOpenNewCategoryForm = () => {
    setShowNewCategoryForm(true);
    setMenuVisible(false);
  };

  // Maneja la creación de nueva categoría
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      setAddingCategory(true);
      setAddCategoryError('');
      const nuevaCat = await createCategoryInDB(newCategoryName);
      // Agregamos la nueva categoría al array local
      setCategories((prev) => [...prev, nuevaCat]);
      // Asignamos la categoría recién creada
      onChangeCategoria(nuevaCat.id);
      // Reseteamos
      setNewCategoryName('');
      setShowNewCategoryForm(false);
    } catch (err) {
      setAddCategoryError('Error al crear la categoría');
    } finally {
      setAddingCategory(false);
    }
  };

  const selectedCategoryName =
    categories.find((cat) => cat.id === categoriaSeleccionada)?.nombre || '';

  return (
    <View style={styles.container}>
      {/** MENU PARA SELECCIONAR CATEGORÍAS */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            onPress={() => setMenuVisible(true)}
            mode="outlined"
            style={styles.dropdownButton}
            icon="chevron-down"
            contentStyle={{ justifyContent: 'space-between' }}
          >
            {loading ? (
              <ActivityIndicator animating size="small" />
            ) : selectedCategoryName ? (
              selectedCategoryName
            ) : (
              'Seleccionar Categoría'
            )}
          </Button>
        }
      >
        {loading && <Menu.Item title="Cargando categorías..." />}
        {!!error && <Menu.Item title={error} />}
        {!loading &&
          !error &&
          categories.map((cat) => (
            <Menu.Item
              key={cat.id}
              title={cat.nombre}
              onPress={() => handleSelectCategory(cat)}
            />
          ))}
        <Menu.Item
          title="Crear nueva categoría"
          onPress={handleOpenNewCategoryForm}
        />
      </Menu>

      {/** FORM PARA CREAR NUEVA CATEGORÍA */}
      {showNewCategoryForm && (
        <View style={styles.newCategoryContainer}>
          <TextInput
            label="Nueva Categoría"
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleCreateCategory}
            disabled={!newCategoryName.trim()}
            loading={addingCategory}
          >
            Guardar Categoría
          </Button>
          {addCategoryError && (
            <HelperText type="error">{addCategoryError}</HelperText>
          )}
        </View>
      )}
    </View>
  );
};

export default CategorySelect;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  dropdownButton: {
    width: '100%',
    justifyContent: 'space-between',
  },
  newCategoryContainer: {
    marginTop: 8,
  },
  input: {
    marginBottom: 8,
  },
});
