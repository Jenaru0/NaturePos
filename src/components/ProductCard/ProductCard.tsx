import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

interface ProductCardProps {
  product: {
    id: string;
    nombre?: string;
    categoria?: string;
    stock?: number;
    variantes?: { nombre: string; capacidad: number; precio: number }[];
    precio?: number;
    imagen?: string; // <-- URL
  };
  onPress: (product: any) => void;
  showVariants?: boolean;
  highlightLowStock?: boolean;
}

// Imagen por defecto local

const defaultImage = require('../../assets/noimage.png');

// O una URL:
// const DEFAULT_IMAGE_URL = 'https://tu-sitio.com/img/no-image.png';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  showVariants = false,
  highlightLowStock = false,
}) => {
  // Manejo de "placeholder" si no hay product.imagen
  const imageSource =
    product.imagen && product.imagen.trim().length > 0
      ? { uri: product.imagen }
      : defaultImage;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        highlightLowStock && (product.stock ?? 0) <= 5 && styles.lowStock,
      ]}
      onPress={() => onPress(product)}
    >
      <Image source={imageSource} style={styles.productImage} />
      
      <Text style={styles.productName}>{product.nombre}</Text>
      {product.precio != null && (
        <Text style={styles.productPrice}>S/ {product.precio}</Text>
      )}
      {product.stock != null && (
        <Text style={styles.productStock}>
          {(product.stock ?? 0) <= 5 ? 'Stock Bajo: ' : 'Stock: '}
          {product.stock}
        </Text>
      )}

      {/* Variantes */}
      {showVariants && product.variantes && product.variantes.length > 0 && (
        <View style={styles.variantsContainer}>
          {product.variantes.slice(0, 2).map((variante, index) => (
            <Text key={index} style={styles.variantText}>
              Variante: {variante.nombre}
            </Text>
          ))}
          {product.variantes.length > 2 && (
            <TouchableOpacity>
              <Text style={styles.moreVariantsText}>
                + {product.variantes.length - 2} variantes más
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ProductCard;
