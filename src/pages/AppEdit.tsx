import {
  CaretRight,
  ChartPieSlice,
  CheckCircle,
  CircleNotch,
  ComputerTower,
  Key,
  Pencil,
  Trash,
} from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Input } from '../components/Form/Input';
import AppModal from '../components/Modal';
import { api } from '../services/api';
import { sheetsResponseData } from '../types';

interface Props {
  appId: string;
  appName: string;
  server: string;
  sheets: sheetsResponseData[];
}

function AppEdit() {
  const { appId, appName, server, sheets } = useLocation().state as Props;

  const [newAppId, setNewAppId] = useState(appId);
  const [newServer, setNewServer] = useState(server);
  const [editApp, setEditApp] = useState(false);
  const [sheetsList, setSheetsList] = useState(sheets);

  const [editSheet, setEditSheet] = useState({} as sheetsResponseData);

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleEditSheet(sheet: sheetsResponseData) {
    setEditSheet(sheet);
    setOpenModal(true);
  }

  async function handleSaveSheet(newTitle: string) {
    try {
      setLoading(true);
      const sheetsListUpdated = await api.post(
        '/sheets',
        {
          action: 'create-update',
          name: appName,
          sheetId: editSheet.sheetId,
          title: newTitle,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setSheetsList(sheetsListUpdated.data);
      alert('Success');
    } catch (error) {
      alert(error);
    } finally {
      setOpenModal(false);
      setLoading(true);
    }
  }

  async function handleSaveApp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const response: { data: { appId: string; server: string } } =
        await api.post(
          '/app',
          {
            action: 'create-update',
            name: appName,
            appId: newAppId,
            server: newServer,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

      const appUpdated = response.data;
      setNewAppId(appUpdated.appId);
      setNewServer(appUpdated.server);
      alert('Success');
    } catch (error) {
      alert(error);
    } finally {
      setEditApp(false);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center pb-4 border-b border-gray-300">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <NavLink
                to="/"
                className="inline-flex items-center text-sm font-medium 
                text-gray-400 hover:text-gray-800"
              >
                <ChartPieSlice weight="fill" className="mr-1" />
                Dashboard
              </NavLink>
            </li>
            <li aria-current="page">
              <div className="flex items-center text-gray-400">
                <CaretRight weight="bold" />
                <span className="ml-1 uppercase text-sm font-medium text-gray-900 md:ml-2">
                  {appName}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {openModal && (
        <AppModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          title={editSheet.title}
          handleSave={handleSaveSheet}
          loading={loading}
        />
      )}
      <div className="shadow p-2 rounded">
        <form className="flex flex-col gap-4" onSubmit={handleSaveApp}>
          <ul className="my-3 space-y-5">
            <li className="flex space-x-3 items-center">
              <Key size={24} className="text-gray-900" />
              <span className="w-full flex flex-1 justify-between font-semibold leading-tight text-gray-600">
                <Input
                  id="appId"
                  placeholder="Server"
                  value={newAppId}
                  onChange={(e) => setNewAppId(e.target.value)}
                  disabled={!editApp}
                />
              </span>
            </li>
            <li className="flex space-x-3 items-center">
              <ComputerTower size={24} className="text-zinc-900" />
              <Input
                id="appId"
                placeholder="Server"
                value={newServer}
                onChange={(e) => setNewServer(e.target.value)}
                disabled={!editApp}
              />
            </li>
          </ul>
          <footer className="flex justify-end gap-4">
            {editApp ? (
              <>
                {!loading && (
                  <button
                    onClick={() => {
                      setNewServer(server);
                      setNewAppId(appId);
                      setEditApp(false);
                    }}
                    disabled={loading}
                    type="button"
                    className="bg-zinc-500 px-5 h-12 rounded font-semibold hover:bg-zinc-600"
                  >
                    Cancel
                  </button>
                )}
                <button
                  className="bg-violet-500 px-5 h-12 flex items-center 
                    rounded font-semibold gap-3 hover:bg-violet-600"
                  type="submit"
                >
                  {!loading ? (
                    <>
                      <CheckCircle size={24} />
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
              </>
            ) : (
              <button
                className="bg-violet-500 px-5 h-12 flex items-center 
                      rounded font-semibold gap-3 hover:bg-violet-600"
                type="button"
                onClick={() => setEditApp(true)}
              >
                <Pencil size={22} />
                Edit
              </button>
            )}
          </footer>
        </form>
      </div>

      <hr className="my-4" />

      <div className="overflow-x-auto relative shadow-lg rounded-lg border border-gray-300">
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
            {sheetsList.map((sheet) => (
              <tr className="bg-white border-b" key={sheet.sheetId}>
                <th scope="row" className="py-3 px-6 font-medium text-gray-900">
                  {sheet.sheetId}
                </th>
                <td className="py-3 px-6 text-gray-900">{sheet.title}</td>
                <td className="py-3 px-6 justify-end flex">
                  <button
                    type="button"
                    onClick={() => handleEditSheet(sheet)}
                    className="text-blue-500 border border-blue-200 hover:text-white 
                    hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm p-2.5 text-center inline-flex 
                    items-center mr-2
                    "
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    type="button"
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

export default AppEdit;
