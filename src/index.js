import React from 'react';

import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import './index.css';
import App from './App';

const root = document.getElementById('root');

// Use createRoot to render your app
const reactRoot = createRoot(root);
reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
