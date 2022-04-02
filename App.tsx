// gesture handler import must be listed first
// https://reactnavigation.org/docs/stack-navigator/#installation
import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './src/pages/Home';

export default function App() {
  return (
    <PaperProvider>
        <Home></Home>
    </PaperProvider>
  );
}
