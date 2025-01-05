import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {theme} from './themes/theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;
