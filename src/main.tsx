import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
const root = document.getElementById('root');
if (!root) throw new Error('Elemento principal não encontrado');
ReactDOM.createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);
