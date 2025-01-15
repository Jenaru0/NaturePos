// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus pantallas
import BottomNavigation from '../components/BottomNavigation/BottomNavigation';
import AddProductScreen from '../screens/AddProductScreen/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen/EditProductScreen';
import ViewCartScreen from '../screens/ViewCartScreen/ViewCartScreen';
import SaleReceiptScreen from '../screens/SaleReceiptScreen/SaleReceiptScreen';

// Creamos el stack
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomNavigation">
        {/* Tu bottom tabs */}
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />

        {/* Pantallas extras */}
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
        <Stack.Screen name="ViewCartScreen" component={ViewCartScreen} />
        <Stack.Screen name="SaleReceiptScreen" component={SaleReceiptScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
