/* eslint-disable react/jsx-no-useless-fragment */
import { ChartPieSlice, FolderPlus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

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
          border-b border-gray-300 h-12 mb-4"
      >
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <span
                className="inline-flex items-center text font-medium 
                    text-gray-800"
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
            border border-blue-200 focus:ring-4 focus:outline-none 
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
          <div className="grid grid-cols-3 gap-3">
            {apps?.map((app) => (
              <AppCard
                key={app.name}
                appId={app.appId}
                appName={app.name}
                server={app.server}
                sheets={app.sheets}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
