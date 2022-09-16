import { useEffect, useState } from 'react';
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
    console.log('create sheeet', app);
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
      {apps?.map((app) => (
        <div key={app.name}>
          {app.appId} - {app.name} - {app.host} <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateSheet(app);
            }}
            className="p-4 bg-gray-200"
          >
            <input
              className="border border-dotted mr-3 w-[450px] border-gray-900 rounded p-4"
              type="text"
              placeholder="sheet ID"
              value={sheetId}
              onChange={(e) => setSheetId(e.target.value)}
            />
            <input
              className="border border-dotted mr-3 w-[450px] border-gray-900 rounded p-4"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="border border-gray-800 rounded bg-gray-400 text-white p-4"
              type="submit"
            >
              {' '}
              Create Sheet{' '}
            </button>
          </form>
          {app.sheets?.map((sheet) => (
            <div key={sheet.sheetId}>{sheet.title}</div>
          ))}
        </div>
      ))}
    </>
  );
}

export default Dashboard;
