import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

export function renderApp() {
  const root = createRoot(document.getElementById('root') as HTMLElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
