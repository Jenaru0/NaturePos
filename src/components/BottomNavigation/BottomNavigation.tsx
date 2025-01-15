  import React from 'react';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import SalesScreen from '../../screens/SalesScreen/SalesScreen';
  import InventoryScreen from '../../screens/InventoryScreen/InventoryScreen';
  import ReportsScreen from '../../screens/ReportsScreen/ReportsScreen';
  import Icon from 'react-native-vector-icons/Ionicons';
  import { styles } from './styles';

  const Tab = createBottomTabNavigator();

  const getTabBarIcon = (route: any) => ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
    let iconName = '';

    if (route.name === 'Ventas') {
      iconName = focused ? 'cart' : 'cart-outline';
    } else if (route.name === 'Inventario') {
      iconName = focused ? 'cube' : 'cube-outline';
    } else if (route.name === 'Reportes') {
      iconName = focused ? 'stats-chart' : 'stats-chart-outline';
    }

    return <Icon name={iconName} size={size} color={color} style={styles.tabBarIcon} />;
  };

  const BottomNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName="Ventas"
        screenOptions={({ route }) => ({
          tabBarIcon: getTabBarIcon(route),
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#ffffff',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Ventas" component={SalesScreen} />
        <Tab.Screen name="Inventario" component={InventoryScreen} />
        <Tab.Screen name="Reportes" component={ReportsScreen} />
      </Tab.Navigator>
    );
  };

  export default BottomNavigation;
