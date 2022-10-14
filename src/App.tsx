import { HashRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Home from './pages/Home';
import AppEdit from './pages/AppEdit';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import AppCreate from './pages/AppCreate';
import { User } from './types';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { UserAuthProvider } from './context/UserAuthContext';
import Servers from './pages/Servers';
import ThemeContextWrapper from './context/ThemeContextWrapper';

export function App() {
  return (
    <div className="flex flex-row min-h-screen dark:bg-gray-400 bg-gray-100">
      <Sidebar />
      <main className="main flex flex-col flex-1 -ml-64 md:ml-0">
        <Header />
        <div className="main-content flex flex-col flex-grow p-1">
          <ToastContainer autoClose={1500} />
          {/* <h1 className="font-bold text-2xl text-gray-700">Dashboard</h1> */}

          <div
            className="flex flex-col flex-1 p-2 border border-gray-200
            bg-white rounded dark:bg-gray-800 dark:border-gray-900"
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/app-edit" element={<AppEdit />} />
              <Route path="/app-create" element={<AppCreate />} />
              <Route path="/servers" element={<Servers />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        {/* <Footer /> */}
      </main>
    </div>
  );
}

export function WrappedApp({ user }: { user: User }) {
  const queryClient = new QueryClient();

  return (
    <HashRouter>
      <UserAuthProvider userInfo={user}>
        <ThemeContextWrapper>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen />
            <App />
          </QueryClientProvider>
        </ThemeContextWrapper>
      </UserAuthProvider>
    </HashRouter>
  );
}
