import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth } from '@qlik/sdk';

import { config } from './utils/AuthConfig';
import { WrappedApp } from './App';
import { User } from './types';

function loadPage({ user }: { user: User }) {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <WrappedApp user={user} />
    </React.StrictMode>
  );
}

(async function getApp() {
  const auth = new Auth(config);

  const isAuthenticated = await auth.isAuthenticated();

  if (!isAuthenticated) {
    auth.authenticate(); // redirects to IDP login page
  } else {
    const userResponse = await auth.rest('/users/me');
    const user: User = await userResponse.json();
    loadPage({ user });
  }
})();
