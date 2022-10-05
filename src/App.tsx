import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import AppEdit from './pages/AppEdit';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import AppCreate from './pages/AppCreate';
import { User } from './types';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { UserAuthProvider } from './context/UserAuthXContext';
import Servers from './pages/Servers';

export function App() {
  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="main flex flex-col flex-1 -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <Header />
        <div className="main-content flex flex-col flex-grow p-2">
          <ToastContainer autoClose={1500} />
          {/* <h1 className="font-bold text-2xl text-gray-700">Dashboard</h1> */}

          <div
            className="flex flex-col flex-1 p-2 border border-gray-200
            bg-white rounded"
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
  return (
    <HashRouter>
      <UserAuthProvider userInfo={user}>
        <App />
      </UserAuthProvider>
    </HashRouter>
  );
}
