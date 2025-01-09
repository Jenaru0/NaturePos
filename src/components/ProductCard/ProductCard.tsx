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
    imagen?: string;
  };
  onPress: (product: any) => void;
  showVariants?: boolean;
  highlightLowStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  showVariants = false,
  highlightLowStock = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        highlightLowStock && (product.stock ?? 0) <= 5 && styles.lowStock,
      ]}
      onPress={() => onPress(product)}
    >
      {product.imagen && (
        <Image source={{ uri: product.imagen }} style={styles.productImage} />
      )}
      <Text style={styles.productName}>{product.nombre}</Text>
      {product.precio !== null && (
        <Text style={styles.productPrice}>S/ {product.precio}</Text>
      )}
      {product.stock !== null && (
        <Text style={styles.productStock}>
          {(product.stock ?? 0) <= 5 ? 'Stock Bajo: ' : 'Stock: '}
          {product.stock}
        </Text>
      )}
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
