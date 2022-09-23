import {
  CaretRight,
  ChartPieSlice,
  CheckCircle,
  CircleNotch,
  ComputerTower,
  Key,
  ListPlus,
  Pencil,
  Trash,
  XCircle,
} from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AddSheetModal from '../components/AddSheetModal';
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
  const [openAddModal, setOpenAddModal] = useState(false);
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
      setLoading(false);
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

  async function handleAddSheet(data: { title: string; sheetId: string }) {
    try {
      setLoading(true);
      const response: { data: sheetsResponseData[] } = await api.post(
        '/sheets',
        {
          action: 'create-update',
          name: appName,
          sheetId: data.sheetId,
          title: data.title,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const sheetsListUpdated = response.data;
      setSheetsList(sheetsListUpdated);
      alert('Success');
    } catch (error) {
      alert(error);
    } finally {
      setOpenAddModal(false);
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
      <AddSheetModal
        isOpen={openAddModal}
        setIsOpen={setOpenAddModal}
        handleSave={handleAddSheet}
        loading={loading}
      />
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
        <form className="flex flex-col" onSubmit={handleSaveApp}>
          <div
            className="flex justify-between border-b border-gray-400 
           items-center"
          >
            <h1>APP Info</h1>
            {editApp ? (
              <div className="flex justify-end gap-2">
                {!loading && (
                  <button
                    onClick={() => {
                      setNewServer(server);
                      setNewAppId(appId);
                      setEditApp(false);
                    }}
                    disabled={loading}
                    type="button"
                    className="text-gray-700 gap-2 bg-white hover:bg-gray-600 
                    border border-gray-600 focus:ring-4 focus:outline-none 
                    focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 
                    text-center inline-flex items-center mb-2 hover:text-white"
                  >
                    <XCircle size={18} />
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="text-green-700 gap-2 bg-white hover:bg-green-600 
                  border border-green-600 focus:ring-4 focus:outline-none 
                  focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 
                  text-center inline-flex items-center mr-2 mb-2 hover:text-white"
                  onClick={() => setEditApp(true)}
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
            ) : (
              <button
                type="button"
                className="text-blue-500 bg-white gap-2 hover:bg-blue-400 
                  border border-blue-200 focus:ring-4 focus:outline-none 
                  focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 
                  text-center inline-flex items-center mr-2 mb-2 hover:text-white"
                onClick={() => setEditApp(true)}
              >
                <Pencil size={16} />
                Edit
              </button>
            )}
          </div>
          <ul className="my-3 space-y-5">
            <li className="flex space-x-3 items-center">
              <Key size={24} className="text-gray-900" />
              <span className="w-full flex flex-1 justify-between font-semibold leading-tight text-gray-600">
                <Input
                  id="appId"
                  placeholder="App ID..."
                  value={newAppId}
                  onChange={(e) => setNewAppId(e.target.value)}
                  disabled={!editApp}
                />
              </span>
            </li>
            <li className="flex space-x-3 items-center">
              <ComputerTower size={24} className="text-zinc-900" />
              <Input
                id="server"
                placeholder="server name..."
                value={newServer}
                onChange={(e) => setNewServer(e.target.value)}
                disabled={!editApp}
              />
            </li>
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
            {sheetsList?.map((sheet) => (
              <tr className="bg-white border-b" key={sheet.sheetId}>
                <th scope="row" className="py-3 px-6 font-medium text-gray-900">
                  {sheet.sheetId}
                </th>
                <td className="py-3 px-6 text-gray-900">{sheet.title}</td>
                <td className="py-3 px-6 justify-end flex">
                  <button
                    type="button"
                    onClick={() => handleEditSheet(sheet)}
                    className="text-blue-400 border border-blue-200 hover:text-white 
                    hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 
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
