import { useEffect, useState } from 'react';

import AppCard from '../components/AppCard';
import { api } from '../services/api';
import { appsDataType, mashupConfigData } from '../types';

function Dashboard() {
  const [apps, setApps] = useState<appsDataType>([]);

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

  return (
    <>
      <h1>Dashboard</h1>
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
  );
}

export default Dashboard;
