import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Provider } from 'react-redux';
import { persistor, store } from './store/rootConfig.ts';

import Loading from './components/Loader/index.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/helper.ts';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

dayjs.extend(utc);
dayjs.extend(timezone);

let container: any = null;

document.addEventListener('DOMContentLoaded', function () {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container);
    root.render(
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    );
  }
});
