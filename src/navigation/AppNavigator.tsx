import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation';
import AddProductScreen from '../screens/AddProductScreen/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen/EditProductScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomNavigation">
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
