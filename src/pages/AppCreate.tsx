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
  Globe,
  IdentificationCard,
  Key,
  Link,
  LinkSimple,
  ListPlus,
  Trash,
  Warning,
} from 'phosphor-react';
import { api } from '../services/api';

import AddSheetModal from '../components/AddSheetModal';
import { Input } from '../components/Form/Input';
import { sheetsResponseData } from '../types';

function AppCreate() {
  const navigate = useNavigate();

  const [appName, setAppName] = useState('');
  const [appId, setAppId] = useState('');
  const [server, setServer] = useState('');
  const [webIntegrationId, setWebIntegrationId] = useState('');
  const [anonUrl, setAnonUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnonAccess, setIsAnonAccess] = useState(false);
  const [sheetsList, setSheetsList] = useState<sheetsResponseData[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);

  function handleAddSheet(data: { title: string; sheetId: string }) {
    setSheetsList([...sheetsList, { ...data }]);
  }

  function handleRemoveSheet(sheet: sheetsResponseData) {
    const sheetsListUpdated = sheetsList.filter(
      (sheetItem) => sheetItem.sheetId !== sheet.sheetId
    );

    setSheetsList(sheetsListUpdated);
  }

  async function handleSaveApp() {
    // e.preventDefault();
    if (!appName || !appId || !server) {
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
            {!server && (
              <dt className="mb-1 text-gray-700 flex items-center gap-2">
                <ComputerTower size={18} color="red" weight="duotone" />
                Server
              </dt>
            )}
            {isAnonAccess && anonUrl === '' && (
              <dt className="mb-1 text-gray-700 flex items-center gap-2">
                <LinkSimple size={18} color="red" weight="duotone" />
                Anon URL
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
          server,
          isCloud: server.includes('qlikcloud'),
          isAnonAccess,
          sheets: sheetsList,
          webIntegrationId,
          anonUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(`APP: ${appName} Added`);
      navigate('/');
    } catch (error) {
      toast.error(`Error on add new app`);
    } finally {
      setLoading(false);
    }
  }

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
                text-gray-400 hover:text-gray-800"
              >
                <ChartPieSlice weight="fill" className="mr-1" />
                Dashboard
              </NavLink>
            </li>
            <li aria-current="page">
              <div className="flex items-center text-gray-400">
                <CaretRight weight="bold" />
                <span className="ml-1 text font-medium text-gray-900 md:ml-2">
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
           items-center my-2 pb-2"
          >
            <h1>APP Info</h1>
          </div>
          <ul className="my-3 space-y-5">
            <li className="flex space-x-3 items-center">
              <IdentificationCard size={24} className="text-gray-900" />
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
              <Key size={24} className="text-gray-900" />
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
              {server.includes('qlikcloud') ? (
                <Cloud size={24} className="text-green-600" weight="duotone" />
              ) : (
                <ComputerTower
                  size={24}
                  className="text-green-600"
                  weight="duotone"
                />
              )}
              <Input
                id="server"
                placeholder="Server..."
                value={server}
                onChange={(e) => setServer(e.target.value)}
              />
              {server.includes('qlikcloud') && (
                <div className="flex flex-1 items-center mr-4">
                  <Globe size={24} className="text-gray-900" />
                  <span className="ml-2 flex-1 text-md font-medium text-gray-900">
                    <Input
                      id="Web Integragration"
                      placeholder="Web Intengration ID..."
                      value={webIntegrationId}
                      onChange={(e) => setWebIntegrationId(e.target.value)}
                    />
                  </span>
                </div>
              )}
            </li>
            {server.includes('qlikcloud') && (
              <li className="grid grid-cols-4 space-x-3 items-center">
                <div
                  className="flex flex-1 font-semibold py-2
                  leading-tight text-gray-600 items-center uppercase"
                >
                  <input
                    id="anon-access"
                    type="checkbox"
                    checked={isAnonAccess}
                    onChange={() => setIsAnonAccess(!isAnonAccess)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded 
                    border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor="anon-access"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Allow anon access
                  </label>
                </div>
                {isAnonAccess && (
                  <div className="flex items-center mr-4 col-span-3">
                    <LinkSimple size={24} className="text-gray-900" />
                    <span className="flex-1 ml-2 text-md font-medium text-gray-900">
                      <Input
                        id="Web Integragration"
                        placeholder="Anon JWT URL..."
                        value={anonUrl}
                        onChange={(e) => setAnonUrl(e.target.value)}
                      />
                    </span>
                  </div>
                )}
              </li>
            )}
          </ul>
        </form>
      </div>

      <hr className="my-4" />

      <div
        className="flex justify-between border-b mb-2 pb-2 border-gray-400 
           items-center"
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
      <div className="overflow-x-auto p-2 relative shadow-lg rounded-lg border border-gray-300">
        <table className="w-full text-sm text-left text-gray-500">
          <thead
            className="text-xs text-gray-800 uppercase bg-white 
          border-b border-gray-300"
          >
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
              <tr className="bg-white border-b" key={sheet.sheetId}>
                <th scope="row" className="py-3 px-6 font-medium text-gray-900">
                  {sheet.sheetId}
                </th>
                <td className="py-3 px-6 text-gray-900">{sheet.title}</td>
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
