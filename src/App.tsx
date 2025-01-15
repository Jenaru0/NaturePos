import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-gesture-handler';
import { theme } from './themes/theme';
import { CartProvider } from './context/CartContext'; // <-- Importa tu CartProvider

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Envuelve aquí tu CartProvider */}
      <CartProvider>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
