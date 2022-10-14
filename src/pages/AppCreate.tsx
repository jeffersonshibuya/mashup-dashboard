import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  CaretRight,
  ChartPieSlice,
  CheckCircle,
  CircleNotch,
  Cloud,
  ComputerTower,
  IdentificationCard,
  Key,
  ListPlus,
  Trash,
  Warning,
} from 'phosphor-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

import AddSheetModal from '../components/AddSheetModal';
import { Input } from '../components/Form/Input';
import { sheetsResponseData } from '../types';
import { fetchServers } from '../services/fetchers';

function AppCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [appName, setAppName] = useState('');
  const [appId, setAppId] = useState('');
  const [loading, setLoading] = useState(false);
  const [sheetsList, setSheetsList] = useState<sheetsResponseData[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [serverSelected, setServerSelected] = useState('');

  function handleAddSheet(data: { title: string; sheetId: string }) {
    setLoading(true);
    setSheetsList([...sheetsList, { ...data }]);
    setLoading(false);
  }

  function handleRemoveSheet(sheet: sheetsResponseData) {
    const sheetsListUpdated = sheetsList.filter(
      (sheetItem) => sheetItem.sheetId !== sheet.sheetId
    );

    setSheetsList(sheetsListUpdated);
  }

  async function handleSaveApp() {
    // e.preventDefault();
    if (!appName || !appId) {
      toast.warn(
        <div>
          <span className="text-red-600 font-semibold flex items-center gap-1">
            <Warning size={16} />
            Fields Required:
          </span>
          <div className="flex flex-col pb-3 pt-3">
            {!appName && (
              <dt className="mb-1 text-gray-700 flex items-center gap-2">
                <IdentificationCard size={18} color="red" weight="duotone" />
                App Name
              </dt>
            )}
            {!appId && (
              <dt className="mb-1 text-gray-700 flex items-center gap-2">
                <Key size={18} color="red" weight="duotone" />
                App ID
              </dt>
            )}
          </div>
        </div>,
        {
          icon: false,
          autoClose: 3000,
        }
      );
      return;
    }
    try {
      setLoading(true);
      await api.post(
        '/app',
        {
          action: 'create-update',
          name: appName,
          appId,
          server: serverSelected,
          sheets: sheetsList,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(`APP: ${appName} Added`);

      queryClient.invalidateQueries(['apps']);

      navigate('/');
    } catch (error) {
      toast.error(`Error on add new app`);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   async function init() {
  //     const serversResponse = await api.post<ServersDataType>(
  //       '/servers',
  //       {
  //         action: 'list',
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     setServers(serversResponse.data);
  //   }

  //   init();
  // }, []);

  const servers = useQuery(['servers'], fetchServers, {
    staleTime: 120000,
  });

  return (
    <>
      <div
        className="flex items-center justify-between pb-4 border-b
      border-gray-300 h-12"
      >
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <NavLink
                to="/"
                className="inline-flex items-center text font-medium 
                text-gray-400 hover:text-gray-800 dark:hover:text-gray-100"
              >
                <ChartPieSlice weight="fill" className="mr-1" />
                Dashboard
              </NavLink>
            </li>
            <li aria-current="page">
              <div className="flex items-center text-gray-400">
                <CaretRight weight="bold" />
                <span
                  className="ml-1 text font-medium dark:text-gray-100 
                text-gray-900 md:ml-2"
                >
                  Create New App
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <button
          type="button"
          onClick={handleSaveApp}
          disabled={loading}
          className="text-green-700 gap-2 bg-white hover:bg-green-600 
            border border-green-600 focus:ring-4 focus:outline-none 
            focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 
            text-center inline-flex items-center mr-4 hover:text-white"
        >
          {!loading ? (
            <>
              <CheckCircle size={18} />
              Save
            </>
          ) : (
            <>
              <CircleNotch
                size={16}
                weight="fill"
                className="animate-spin mr-2"
              />
              Saving...
            </>
          )}
        </button>
      </div>
      <AddSheetModal
        isOpen={openAddModal}
        setIsOpen={setOpenAddModal}
        handleSave={handleAddSheet}
      />
      <div className="shadow p-2 rounded">
        <form className="flex flex-col" onSubmit={handleSaveApp}>
          <div
            className="flex justify-between border-b border-gray-400 
           items-center my-2 pb-2 dark:text-white dark:border-gray-500"
          >
            <h1>APP Info</h1>
          </div>
          <ul className="my-3 space-y-5">
            <li className="flex space-x-3 items-center">
              <IdentificationCard
                size={24}
                className="text-gray-900 dark:text-gray-400"
              />
              <span className="w-full flex flex-1 flex-col justify-between font-semibold leading-tight text-gray-600">
                <Input
                  id="appName"
                  name="appName"
                  placeholder="App Name..."
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                />
              </span>
            </li>
            <li className="flex space-x-3 items-center">
              <Key size={24} className="text-gray-900 dark:text-gray-400" />
              <span className="w-full flex flex-1 justify-between font-semibold leading-tight text-gray-600">
                <Input
                  id="appId"
                  placeholder="App ID..."
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                />
              </span>
            </li>
            <li className="flex space-x-3 items-center">
              {serverSelected.includes('qlikcloud') ? (
                <Cloud size={24} className="text-green-600" weight="duotone" />
              ) : (
                <ComputerTower
                  size={24}
                  className="text-green-600"
                  weight="duotone"
                />
              )}
              <select
                id="server"
                value={serverSelected}
                onChange={(e) => setServerSelected(e.target.value)}
                name="server"
                className="w-full bg-white py-2 px-4 flex-1 text-gray-900 rounded text-sm 
                placeholder:text-gray-400 border border-zinc-400 focus:outline-1 
                focus:outline-zinc-500 disabled:bg-gray-200 disabled:cursor-not-allowed 
                disabled:text-gray-800 font-semibold peer dark:text-white
                dark:bg-gray-900 disabled:dark:text-gray-400"
              >
                <option value="" defaultValue="" disabled>
                  SELECT THE SERVER...
                </option>
                {servers.data?.map((serverData) => (
                  <option
                    key={serverData.name}
                    value={serverData.name}
                    className="font-semibold text-gray-600 dark:text-gray-200"
                  >
                    {serverData.name} [{serverData.serverUrl}]
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </form>
      </div>

      <hr className="my-4 dark:border-gray-600" />

      <div
        className="flex justify-between border-b mb-2 pb-2 border-gray-400 
           items-center dark:text-white dark:border-gray-500"
      >
        <h1>Sheets</h1>
        <button
          type="button"
          className="text-blue-500 bg-white gap-2 hover:bg-blue-400 
            border border-blue-200 focus:ring-4 focus:outline-none 
            focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 
            text-center inline-flex items-center mr-2 mb-2 hover:text-white"
          onClick={() => setOpenAddModal(true)}
        >
          <ListPlus size={16} />
          New Sheet
        </button>
      </div>
      <div className="overflow-x-auto relative shadow-lg rounded-lg border border-gray-300">
        <table className="w-full text-sm text-left dark:bg-gray-900 text-gray-900 dark:text-white">
          <thead className="text-xs uppercase border-b border-gray-300">
            <tr>
              <th scope="col" className="py-4 px-6">
                ID
              </th>
              <th scope="col" className="py-4 px-6">
                Title
              </th>
              <th scope="col" className="py-4 px-6" />
            </tr>
          </thead>
          <tbody>
            {sheetsList?.map((sheet) => (
              <tr className="border-b" key={sheet.sheetId}>
                <th scope="row" className="py-3 px-6 font-medium">
                  {sheet.sheetId}
                </th>
                <td className="py-3 px-6">{sheet.title}</td>
                <td className="py-3 px-6 justify-end flex">
                  <button
                    type="button"
                    onClick={() => handleRemoveSheet(sheet)}
                    className="text-red-500 border border-red-200 hover:text-white 
                    hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm p-2.5 text-center inline-flex 
                    items-center mr-2
                    "
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AppCreate;
