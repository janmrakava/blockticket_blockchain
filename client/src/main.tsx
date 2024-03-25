import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.tsx';
import { Provider } from 'react-redux';
import { store } from './pages/store.ts';
import './index.css';
import I18n from './services/i18n.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MetaMaskProvider } from '@metamask/sdk-react';

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: 'BlockChainTicket',
          url: window.location.href
        }
      }}>
      <Provider store={store}>
        <I18n>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </I18n>
      </Provider>
    </MetaMaskProvider>
  </React.StrictMode>
);
