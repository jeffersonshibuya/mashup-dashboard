/* eslint-disable react/jsx-no-useless-fragment */
import { ChartPieSlice, FolderPlus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import AppCard from '../components/AppCard';
import Loading from '../components/Loading';
import { api } from '../services/api';
import { appsDataType } from '../types';

function Dashboard() {
  const [apps, setApps] = useState<appsDataType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const appsInfo = await api.get<appsDataType>('/apps', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setApps(appsInfo.data);
      setLoading(false);
    }

    init();
  }, []);

  return (
    <>
      <div
        className="flex items-center justify-between pb-4 
          border-b border-gray-300 dark:border-gray-600 h-12 mb-4"
      >
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <span
                className="inline-flex items-center text font-medium 
                    text-gray-800 dark:text-white"
              >
                <ChartPieSlice weight="fill" className="mr-1" />
                Dashboard
              </span>
            </li>
          </ol>
        </nav>
        <NavLink
          to="/app-create"
          className="text-blue-500 bg-white gap-2 hover:bg-blue-400 
            border border-blue-200 dark:border-gray-800 focus:ring-4 
            focus:outline-none 
            dark:bg-gray-900 dark:hover:bg-blue-400 dark:text-gray-200
            dark:hover:text-white
            focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 
            text-center inline-flex items-center mr-2 hover:text-white"
        >
          <FolderPlus size={16} />
          Add New App
        </NavLink>
      </div>
      {loading ? (
        <div className="grid grid-cols-3 gap-3">
          <Loading />
          <Loading />
          <Loading />
          <Loading />
        </div>
      ) : (
        <>
          {apps?.length === 0 ? (
            <div
              className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
              role="alert"
            >
              <p className="font-bold">No apps found!</p>
              <p className="mt-4">
                <NavLink
                  to="/app-create"
                  className="text-blue-500 bg-white gap-2 hover:bg-blue-400 
                    border border-blue-200 dark:border-gray-800 focus:ring-4 
                    focus:outline-none 
                    dark:bg-gray-900 dark:hover:bg-blue-400 dark:text-gray-200
                    dark:hover:text-white
                    focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 
                    text-center inline-flex items-center mr-2 hover:text-white"
                >
                  <FolderPlus size={16} />
                  Add New App
                </NavLink>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {apps?.map((app) => (
                <AppCard
                  key={app.name}
                  appId={app.appId}
                  appName={app.name}
                  serverName={app.server.name}
                  serverUrl={app.server.serverUrl}
                  sheets={app.sheets}
                  isCloud={app.server.isCloud || false}
                  isAnonAccess={app.server.isAnonAccess || false}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Dashboard;
