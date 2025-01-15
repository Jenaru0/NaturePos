// navigation/types.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definimos las pantallas y sus params
export type RootStackParamList = {
  BottomNavigation: undefined;
  AddProduct: undefined;
  EditProduct: undefined;
  ViewCartScreen: undefined;
  // Aquí "SaleReceiptScreen" recibe { saleId: string }
  SaleReceiptScreen: { saleId: string };
  SalesScreen: undefined;
};

// (opcional) Tipos de Navigation Prop
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
export type SaleReceiptRouteProp = RouteProp<RootStackParamList, 'SaleReceiptScreen'>;
