import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './providers/twind';
import { RouterProvider } from 'react-router-dom';
import { TRPCProvider } from './providers/trpc';
import { router } from './pages/_router';
import { Auth0Provider } from '@auth0/auth0-react';

import reportWebVitals from './reportWebVitals';

async function renderRoot() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./__mocks__/msw/browser');
    await worker.start();
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
      >
        <TRPCProvider>
          <RouterProvider router={router} />
        </TRPCProvider>
      </Auth0Provider>
    </StrictMode>
  );
}

renderRoot();

reportWebVitals();
