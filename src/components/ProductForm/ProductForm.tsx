import React, { useState, useMemo } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import {
  TextInput,
  Button,
  Switch,
  Text,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';

import CategorySelect from '../CategorySelect/CategorySelect';
import VariantCard from '../VariantCard/VariantCard';
import VariantForm from '../VariantForm/VariantForm';
import useVariants from '../../hooks/useVariants';
import useValidation from '../../hooks/useValidation';
import styles from './styles';
import { Product } from '../../types/Product';

interface ProductFormProps {
  initialProduct?: Product;
  onSave: (product: Product) => void;
  onDelete?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct,
  onSave,
  onDelete,
}) => {
  const [nombre, setNombre] = useState(initialProduct?.nombre || '');
  const [categoria, setCategoria] = useState(initialProduct?.categoria || '');
  const [stock, setStock] = useState(initialProduct?.stock?.toString() || '');
  const [precio, setPrecio] = useState(initialProduct?.precio?.toString() || '');
  const [tipoProducto, setTipoProducto] = useState(initialProduct?.tipoProducto || '');
  const [unidadesPorContenedor, setUnidadesPorContenedor] = useState(
    initialProduct?.unidadesPorContenedor?.toString() || ''
  );
  const [tieneVariantes, setTieneVariantes] = useState(!!initialProduct?.variantes);
  const { variantes, addVariante, deleteVariante } = useVariants(
    initialProduct?.variantes || [],
    Number(stock),
    Number(unidadesPorContenedor)
  );
  const { errors, validateForm } = useValidation({
    nombre,
    categoria,
    nuevaCategoria: '',
    stock,
    precio,
    tieneVariantes,
    variantes,
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        await onSave({
          nombre,
          categoria,
          stock: Number(stock),
          precio: Number(precio),
          tipoProducto: tieneVariantes ? tipoProducto : null,
          unidadesPorContenedor: tieneVariantes ? Number(unidadesPorContenedor) : null,
          variantes,
        });
        Alert.alert('Éxito', 'Producto guardado correctamente.');
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al guardar el producto.');
      } finally {
        setLoading(false);
      }
    }
  };

  const variantForm = useMemo(
    () => (tieneVariantes ? <VariantForm onAddVariant={addVariante} /> : null),
    [tieneVariantes, addVariante]
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.form}>
        {/* Campos Principales */}
        <TextInput
          label="Nombre del Producto"
          value={nombre}
          onChangeText={setNombre}
          mode="outlined"
          style={styles.input}
          error={!!errors.nombre}
        />
        {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

        {/* Dropdown para Categorías */}
        <CategorySelect
          categoriaSeleccionada={categoria}
          onChangeCategoria={(catId) => setCategoria(catId)}
        />
        {errors.categoria && <Text style={styles.errorText}>{errors.categoria}</Text>}

        <TextInput
          label="Stock"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          error={!!errors.stock}
        />
        {errors.stock && <Text style={styles.errorText}>{errors.stock}</Text>}

        <TextInput
          label="Precio Base"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          error={!!errors.precio}
        />
        {errors.precio && <Text style={styles.errorText}>{errors.precio}</Text>}

        {/* Switch para Variantes */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>¿Este producto tiene variantes?</Text>
          <Switch value={tieneVariantes} onValueChange={setTieneVariantes} />
        </View>

        {/* Campos Adicionales para Variantes */}
        {tieneVariantes && (
          <>
            <TextInput
              label="Tipo de Producto"
              value={tipoProducto}
              onChangeText={setTipoProducto}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Unidades por Contenedor"
              value={unidadesPorContenedor}
              onChangeText={setUnidadesPorContenedor}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />
            {variantForm}
          </>
        )}

        {/* Lista de Variantes */}
        {variantes.length > 0 && (
          <View style={styles.variantsList}>
            {variantes.map((variant, index) => (
              <VariantCard
                key={`variant-${index}`}
                {...variant}
                onDelete={() => deleteVariante(index)}
              />
            ))}
          </View>
        )}

        {/* Botones */}
        <Divider style={styles.divider} />
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          disabled={loading}
        >
          {loading ? <ActivityIndicator animating={true} color="#fff" /> : 'Guardar Producto'}
        </Button>
        {onDelete && (
          <Button mode="outlined" onPress={onDelete} style={styles.deleteButton}>
            Eliminar Producto
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

export default React.memo(ProductForm);
