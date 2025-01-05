import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../../services/firebase';

const AddProductScreen = ({navigation}) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [variantes, setVariantes] = useState([]);
  const [nombreVariante, setNombreVariante] = useState('');
  const [cantidadVariante, setCantidadVariante] = useState('');
  const [precioVariante, setPrecioVariante] = useState('');
  const [showVariantes, setShowVariantes] = useState(false);

  const categoriasPredefinidas = ['Panes', 'Suplementos', 'Bebidas'];

  const handleAddVariante = () => {
    if (!nombreVariante || !cantidadVariante || !precioVariante) {
      Alert.alert('Error', 'Completa todos los campos de la variante.');
      return;
    }
    setVariantes([
      ...variantes,
      {
        nombre: nombreVariante,
        cantidad: Number(cantidadVariante),
        precio: Number(precioVariante),
      },
    ]);
    setNombreVariante('');
    setCantidadVariante('');
    setPrecioVariante('');
  };

  const handleSaveProducto = async () => {
    if (!nombre || !cantidad || (!precio && variantes.length === 0)) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const categoriaFinal = nuevaCategoria ? nuevaCategoria : categoria;

    try {
      const producto = {
        nombre,
        categoria: categoriaFinal,
        cantidad: Number(cantidad),
        precio: Number(precio),
      };

      if (variantes.length > 0) {
        producto.variantes = variantes;
      }

      await addDoc(collection(db, 'productos'), producto);
      Alert.alert('Éxito', 'Producto agregado correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar el producto.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Producto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: Pan Integral"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Categoría:</Text>
      <Picker
        selectedValue={categoria}
        onValueChange={itemValue => setCategoria(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Selecciona una categoría" value="" />
        {categoriasPredefinidas.map((cat, index) => (
          <Picker.Item key={index} label={cat} value={cat} />
        ))}
        <Picker.Item label="Crear nueva categoría" value="nueva" />
      </Picker>

      {categoria === 'nueva' && (
        <TextInput
          style={styles.input}
          placeholder="Nueva categoría"
          value={nuevaCategoria}
          onChangeText={setNuevaCategoria}
        />
      )}

      <Text style={styles.label}>Stock Inicial:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 100"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 5.00"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowVariantes(!showVariantes)}>
        <Text style={styles.toggleButtonText}>
          {showVariantes ? 'Ocultar Variantes' : 'Mostrar Variantes'}
        </Text>
      </TouchableOpacity>

      {showVariantes && (
        <>
          <Text style={styles.label}>Agregar Variantes:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la variante (Ej: Unidad)"
            value={nombreVariante}
            onChangeText={setNombreVariante}
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad por variante (Ej: 1, 13)"
            value={cantidadVariante}
            onChangeText={setCantidadVariante}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Precio por variante (Ej: 5.00)"
            value={precioVariante}
            onChangeText={setPrecioVariante}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddVariante}>
            <Text style={styles.addButtonText}>Agregar Variante</Text>
          </TouchableOpacity>

          <FlatList
            data={variantes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.variantItem}>
                <Text>Nombre: {item.nombre}</Text>
                <Text>Cantidad: {item.cantidad}</Text>
                <Text>Precio: S/{item.precio}</Text>
              </View>
            )}
          />
        </>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProducto}>
        <Text style={styles.saveButtonText}>Guardar Producto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  label: {fontSize: 16, fontWeight: 'bold', marginBottom: 8},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#03dac4',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {color: '#fff', fontWeight: 'bold'},
  variantItem: {padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'},
  saveButton: {
    backgroundColor: '#03dac4',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {color: '#fff', fontWeight: 'bold', fontSize: 16},
  toggleButton: {
    backgroundColor: '#03dac4',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButtonText: {color: '#fff', fontWeight: 'bold'},
});

export default AddProductScreen;
