import { useEffect, useState } from 'react';

import AppCard from '../components/AppCard';
import { api } from '../services/api';
import { appsDataType, mashupConfigData } from '../types';

function Dashboard() {
  const [apps, setApps] = useState<appsDataType>([]);

  const [sheetId, setSheetId] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function init() {
      const appsInfo = await api.get<appsDataType>('/apps', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setApps(appsInfo.data);
    }

    init();
  }, []);

  async function handleCreateSheet(app: mashupConfigData) {
    try {
      const sheets = await api.post(
        '/sheets',
        {
          action: 'create-update',
          name: app.name,
          sheetId,
          title,
          sortOrder: '10',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Success');
      console.log(JSON.stringify(sheets.data));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <h1>Dashboard</h1>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>
      <AppModal isOpen={openModal} /> */}
      {apps?.map((app) => (
        <div key={app.name} className="grid grid-cols-3">
          <AppCard
            appId={app.appId}
            appName={app.name}
            server={app.server}
            sheets={app.sheets}
          />
        </div>
      ))}
    </>
  );
}

export default Dashboard;
