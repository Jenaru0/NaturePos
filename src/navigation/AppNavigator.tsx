import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SalesScreen from '../screens/SalesScreen/SalesScreen';
import InventoryScreen from '../screens/InventoryScreen/InventoryScreen';
import AddProductScreen from '../screens/AddProductScreen/AddProductScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sales">
        <Stack.Screen name="Sales" component={SalesScreen} />
        <Stack.Screen name="Inventario" component={InventoryScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
