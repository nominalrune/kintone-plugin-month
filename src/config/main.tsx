import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const main = (pluginId: string): void => {
  const rootEl =document.getElementById('settings');
  if (!rootEl)return;
  createRoot(document.getElementById('settings')!)
    .render(<App {...{ pluginId }} />);
};

export default main;
