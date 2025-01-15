import React, { useState } from 'react';
import { View, ScrollView, Alert, Image } from 'react-native';
import {
  TextInput,
  Button,
  Switch,
  Text,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import { launchImageLibrary, PhotoQuality } from 'react-native-image-picker';

import CategorySelect from '../CategorySelect/CategorySelect';
import VariantCard from '../VariantCard/VariantCard';
import VariantForm from '../VariantForm/VariantForm';
import useValidation from '../../hooks/useValidation';
import { uploadImageAsync } from '../../services/uploadImage';
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
  // === Campos principales (sin variantes) ===
  const [nombre, setNombre] = useState(initialProduct?.nombre || '');
  const [categoria, setCategoria] = useState(initialProduct?.categoria || '');
  const [stock, setStock] = useState(initialProduct?.stock?.toString() || '0');
  const [precio, setPrecio] = useState(initialProduct?.precio?.toString() || '0');

  // === Manejo de imagen ===
  const [imageUri, setImageUri] = useState(initialProduct?.imagen || '');

  // === ¿Tiene Variantes? (switch) ===
  const [tieneVariantes, setTieneVariantes] = useState(
    !!(initialProduct?.variantes && initialProduct.variantes.length > 0)
  );

  // === Campos si hay variantes ===
  const [tipoProducto, setTipoProducto] = useState(initialProduct?.tipoProducto || '');
  const [unidadesPorContenedor, setUnidadesPorContenedor] = useState(
    initialProduct?.unidadesPorContenedor?.toString() || '0'
  );
  const [contenedoresAbiertos, setContenedoresAbiertos] = useState(
    initialProduct?.contenedoresAbiertos?.toString() || '0'
  );
  const [unidadesAbiertasDisponibles, setUnidadesAbiertasDisponibles] = useState(
    initialProduct?.unidadesAbiertasDisponibles?.toString() || '0'
  );

  // === Arreglo de variantes ===
  const [variantes, setVariantes] = useState(
    initialProduct?.variantes || []
  );

  // === Validación ===
  // - Le pasamos "unidadesPorContenedor" solo si tieneVariantes = true
  // - 'nuevaCategoria' = '' si no la usas
  // - 'variantes': convertimos con map para la validación
  const { errors, validateForm } = useValidation({
    nombre,
    categoria,
    nuevaCategoria: '',
    stock,
    precio,
    tieneVariantes,
    unidadesPorContenedor: tieneVariantes ? unidadesPorContenedor : undefined,
    variantes: variantes.map((v) => ({
      nombre: v.nombre,
      capacidad: v.capacidad,
      precio: v.precio,
    })),
  });

  const [loading, setLoading] = useState(false);

  // === Seleccionar imagen ===
  const pickImage = async () => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.6 as PhotoQuality,
      includeBase64: false,
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      return;
    }
    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Error al seleccionar imagen');
      return;
    }
    if (result.assets && result.assets[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  // === Eliminar imagen ===
  const removeImage = () => {
    setImageUri('');
  };

  // === Manejar guardado ===
  const handleSave = async () => {
    // Validar el formulario antes de proceder
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);

    try {
      let finalImageUrl = initialProduct?.imagen || ''; // Mantener la URL actual si no se modifica la imagen

      // === Subida de la imagen (si hay cambios) ===
      if (imageUri && imageUri !== finalImageUrl) {
        console.log('Subiendo imagen...');
        const filename = initialProduct?.id
          ? `images/productos/${initialProduct.id}.jpg` // Usar ID existente si hay un producto
          : `images/productos/${Date.now()}.jpg`; // Generar un nombre único basado en la marca de tiempo
        console.log('Nombre del archivo:', filename);

        // Intentar subir la imagen y obtener su URL
        finalImageUrl = await uploadImageAsync(imageUri, filename);
        console.log('URL final de la imagen:', finalImageUrl);
      }

      // === Si se eliminó la imagen (imageUri vacío) ===
      if (!imageUri) {
        finalImageUrl = '';
      }

      // === Construir el objeto del producto final ===
      const productFinal: Product = {
        ...initialProduct, // Mantener datos existentes si es un producto ya existente
        id: initialProduct?.id || `${Date.now()}`, // Generar ID si es un producto nuevo
        nombre, // Nombre del producto
        categoria, // Categoría seleccionada
        imagen: finalImageUrl, // URL de la imagen (nueva, actual o vacía)
        stock: Number(stock), // Asegurar que sea un número
        precio: Number(precio), // Asegurar que sea un número
      };

      // === Manejo de variantes ===
      if (tieneVariantes) {
        productFinal.tipoProducto = tipoProducto || null;
        productFinal.unidadesPorContenedor = Number(unidadesPorContenedor) || 0;
        productFinal.contenedoresAbiertos = Number(contenedoresAbiertos) || 0;
        productFinal.unidadesAbiertasDisponibles = Number(unidadesAbiertasDisponibles) || 0;
        productFinal.variantes = variantes;
      } else {
        // Si NO tiene variantes, asignar valores nulos o vacíos
        productFinal.tipoProducto = null;
        productFinal.unidadesPorContenedor = null;
        productFinal.contenedoresAbiertos = null;
        productFinal.unidadesAbiertasDisponibles = null;
        productFinal.variantes = [];
      }

      console.log('Objeto final del producto:', productFinal);

      // === Guardar el producto ===
      await onSave(productFinal);

      Alert.alert('Éxito', 'Producto guardado correctamente.');
    } catch (error) {
      // Manejar errores durante el guardado o la subida de la imagen
      console.error('Error al guardar el producto:', error);
      Alert.alert('Error', 'Hubo un problema al guardar el producto.');
    } finally {
      // Finalizar la operación, ocultar el indicador de carga
      setLoading(false);
    }
  };


  // === Manejo de variantes (agregar/eliminar) ===
  const handleAddVariant = (
    nombreV: string,
    capacidadV: number,
    precioV: number,
    dependeDeApertura?: boolean
  ) => {
    setVariantes((prev) => [
      ...prev,
      { nombre: nombreV, capacidad: capacidadV, precio: precioV, dependeDeApertura },
    ]);
  };

  const handleDeleteVariant = (index: number) => {
    setVariantes((prev) => {
      const newArray = [...prev];
      newArray.splice(index, 1);
      return newArray;
    });
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.form}>

        {/* Nombre */}
        <TextInput
          label="Nombre del Producto"
          value={nombre}
          onChangeText={setNombre}
          mode="outlined"
          style={styles.input}
          error={!!errors.nombre}
        />
        {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

        {/* Categoría */}
        <CategorySelect
          categoriaSeleccionada={categoria}
          onChangeCategoria={(catId) => setCategoria(catId)}
        />
        {errors.categoria && <Text style={styles.errorText}>{errors.categoria}</Text>}

        {/* Stock */}
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

        {/* Precio */}
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

        {/* Imagen */}
        <View style={styles.imageSection}>
          {imageUri ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: imageUri }} style={styles.productImage} />
              <Button
                mode="text"
                onPress={removeImage}
                style={styles.removeImageButton}
              >
                Eliminar Imagen
              </Button>
            </View>
          ) : (
            <Button
              mode="outlined"
              onPress={pickImage}
              style={styles.pickImageButton}
            >
              Seleccionar Imagen
            </Button>
          )}
        </View>

        {/* Switch para Variantes */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>¿Este producto tiene variantes?</Text>
          <Switch value={tieneVariantes} onValueChange={setTieneVariantes} />
        </View>

        {/* Si NO tiene variantes, solo mostramos un texto de ayuda */}
        {!tieneVariantes && (
          <Text style={styles.helpText}>
            Este producto se venderá sin despieces ni variantes.
          </Text>
        )}

        {/* Si SÍ tiene variantes => mostramos campos extra */}
        {tieneVariantes && (
          <>
            <TextInput
              label="Tipo de Producto (ej. Bolsa, Caja)"
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
              error={!!errors.unidadesPorContenedor}
            />
            {errors.unidadesPorContenedor && (
              <Text style={styles.errorText}>{errors.unidadesPorContenedor}</Text>
            )}

            <TextInput
              label="Contenedores Abiertos"
              value={contenedoresAbiertos}
              onChangeText={setContenedoresAbiertos}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Unidades Abiertas Disponibles"
              value={unidadesAbiertasDisponibles}
              onChangeText={setUnidadesAbiertasDisponibles}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />

            <Divider style={styles.divider} />
            <Text style={styles.label}>Variantes (porciones)</Text>
            {variantes.length > 0 && (
              <View style={styles.variantsList}>
                {variantes.map((variant, index) => (
                  <VariantCard
                    key={`variant-${index}`}
                    nombre={variant.nombre}
                    capacidad={variant.capacidad}
                    precio={variant.precio}
                    dependeDeApertura={variant.dependeDeApertura}
                    onDelete={() => handleDeleteVariant(index)}
                  />
                ))}
              </View>
            )}
            <VariantForm onAddVariant={handleAddVariant} />
          </>
        )}

        {/* Botones */}
        <Divider style={styles.divider} />
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          disabled={loading}
        >
          {loading ? <ActivityIndicator animating color="#fff" /> : 'Guardar Producto'}
        </Button>
        {onDelete && (
          <Button
            mode="outlined"
            onPress={onDelete}
            style={styles.deleteButton}
          >
            Eliminar Producto
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

export default React.memo(ProductForm);
