import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import App from './App';

const container = document.getElementById('root')!;
const store = setupStore();
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
