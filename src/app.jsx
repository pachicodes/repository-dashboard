import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './components/Dashboard';
import './styles/Dashboard.css';

const App = () => (
    <Dashboard />
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);