import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, BaseStyles } from '@primer/react';
import Dashboard from './components/Dashboard';

const App = () => (
  <ThemeProvider>
    <BaseStyles>
      <Dashboard />
    </BaseStyles>
  </ThemeProvider>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
