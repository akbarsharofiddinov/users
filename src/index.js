import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/main.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-notifications/lib/notifications.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);