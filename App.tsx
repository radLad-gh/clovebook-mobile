import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';

export default function Main () {
  return (
    <PaperProvider theme={theme}>
    <App />
    </PaperProvider>
  )
}
