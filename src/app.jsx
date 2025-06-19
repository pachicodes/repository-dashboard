import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './components/Dashboard';

const App = () => (
    <AppProvider>
        <Dashboard />
    </AppProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));