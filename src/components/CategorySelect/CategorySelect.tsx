// CategorySelect.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Menu,
  Button,
  TextInput,
  ActivityIndicator,
  HelperText,
  useTheme,
} from 'react-native-paper';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

// Interfaz de categoría
export interface Category {
  id: string;
  nombre: string;
}

interface CategorySelectProps {
  /** ID de la categoría seleccionada actualmente (puede ser '' si es nuevo). */
  categoriaSeleccionada: string;
  /** Callback que notifica al padre el nuevo id de categoría seleccionado/creado. */
  onChangeCategoria: (categoriaId: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categoriaSeleccionada,
  onChangeCategoria,
}) => {
  const theme = useTheme();

  // Estado para la lista de categorías
  const [categories, setCategories] = useState<Category[]>([]);
  // Loading y error para el fetch de categorías
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Control del Menú
  const [menuVisible, setMenuVisible] = useState(false);

  // Para el formulario de nueva categoría
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState('');

  /** 1) Obtener todas las categorías desde Firestore al montar */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError('');
        const snapshot = await getDocs(collection(db, 'categorias'));
        const allCats = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Category, 'id'>),
        }));
        setCategories(allCats);
      } catch (err) {
        setError('Error al cargar categorías');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  /** 2) Manejar selección de categoría */
  const handleSelectCategory = (catId: string) => {
    onChangeCategoria(catId);
    setMenuVisible(false);
  };

  /** 3) Abrir el formulario para crear nueva categoría */
  const handleOpenNewCategoryForm = () => {
    setShowNewCategoryForm(true);
    setMenuVisible(false);
  };

  /** 4) Crear la nueva categoría en Firestore */
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      return;
    }

    try {
      setAddingCategory(true);
      setAddCategoryError('');

      const docRef = await addDoc(collection(db, 'categorias'), {
        nombre: newCategoryName,
      });

      // Creamos un objeto Category localmente
      const nuevaCat: Category = {
        id: docRef.id,
        nombre: newCategoryName,
      };

      // Agregarla a la lista actual (optimistic update)
      setCategories((prev) => [...prev, nuevaCat]);
      // Seleccionarla inmediatamente
      onChangeCategoria(nuevaCat.id);

      // Limpiar
      setNewCategoryName('');
      setShowNewCategoryForm(false);
    } catch (err) {
      setAddCategoryError('No se pudo crear la categoría');
    } finally {
      setAddingCategory(false);
    }
  };

  // Obtener el nombre de la categoría actualmente seleccionada
  const selectedCategoryObj = categories.find(
    (cat) => cat.id === categoriaSeleccionada
  );
  const selectedCategoryName = selectedCategoryObj?.nombre || '';

  return (
    <View style={styles.container}>
      {/* BOTÓN que ancla el menú de selección */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.dropdownButton}
            icon="chevron-down"
            contentStyle={{ justifyContent: 'space-between' }}
            labelStyle={{
              color: selectedCategoryName ? theme.colors.onSurface : '#999',
            }}
          >
            {loading ? (
              <ActivityIndicator animating size="small" />
            ) : selectedCategoryName ? (
              selectedCategoryName
            ) : (
              'Seleccionar categoría'
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
              onPress={() => handleSelectCategory(cat.id)}
            />
          ))}
        <Menu.Item
          title="Crear nueva categoría"
          onPress={handleOpenNewCategoryForm}
        />
      </Menu>

      {/* FORM PARA CREAR NUEVA CATEGORÍA */}
      {showNewCategoryForm && (
        <View style={styles.newCategoryContainer}>
          <TextInput
            label="Nueva Categoría"
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleCreateCategory}
            loading={addingCategory}
            disabled={!newCategoryName.trim()}
          >
            Guardar Categoría
          </Button>
          {!!addCategoryError && (
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
  contentStyle: {
    justifyContent: 'space-between',
  },
});
