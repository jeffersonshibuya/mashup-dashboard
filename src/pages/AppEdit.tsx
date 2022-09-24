import {
  CaretRight,
  ChartPieSlice,
  CheckCircle,
  Checks,
  CheckSquare,
  CircleNotch,
  ComputerTower,
  Key,
  ListPlus,
  Pencil,
  Trash,
  WarningCircle,
  X,
  XCircle,
} from 'phosphor-react';
import { confirmAlert } from 'react-confirm-alert';
import { FormEvent, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  const navigate = useNavigate();
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
      toast.success(`Sheet: ${newTitle} Updated`);
    } catch (error) {
      toast.error('Error on updated sheet');
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
      toast.success(`App: ${appName} Updated`);
    } catch (error) {
      toast.error(`Error on update the APP`);
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
      toast.success(`Sheet: ${data.title} Added`);
    } catch (error) {
      toast.error('Error on add new sheet!');
    } finally {
      setOpenAddModal(false);
      setLoading(false);
    }
  }

  async function DeleteSheet(sheetId: string) {
    try {
      const responsePromise = new Promise((resolve, reject) => {
        api
          .post(
            '/sheets',
            {
              action: 'delete',
              name: appName,
              sheetId,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            const sheetsListUpdated = response.data;
            setSheetsList(sheetsListUpdated);
            resolve('');
          })
          .catch(() => reject);
      });
      toast.promise(responsePromise, {
        pending: 'Deleting sheet...',
        success: {
          render() {
            return (
              <span className="text-lg text-green-700">Sheet deleted</span>
            );
          },
          // other options
          icon: <Checks size={22} color="#1f861d" />,
        },
        error: {
          render() {
            return (
              <span className="text-red-500">Error on delete {sheetId}</span>
            );
          },
        },
      });
    } catch (error) {
      toast.error('Error on add new sheet!');
    }

    //   const sheetsListUpdated = response.data;
    //   setSheetsList(sheetsListUpdated);
    //   toast.success(`Sheet: ${sheetId} Deleted`);
    // } catch (error) {
    //   toast.error('Error on add new sheet!');
    // }
  }

  function handleConfirmDeleteSheet(sheet: sheetsResponseData) {
    confirmAlert({
      // eslint-disable-next-line react/no-unstable-nested-components
      customUI: ({ onClose }) => {
        return (
          <div className="overflow-y-auto overflow-x-hidden  md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative bg-white rounded-lg shadow">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent
                   hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm
                    p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="popup-modal"
                >
                  <X size={22} />
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <div className="mx-auto mb-4 w-14 h-14 text-yellow-400">
                    <WarningCircle size={48} />
                  </div>
                  <h3 className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this sheet? <br />
                    <dl className="max-w-md text-gray-500 divide-y mt-2 divide-gray-400">
                      <div
                        className="flex flex-col pb-3 pt-3"
                        key={sheet.sheetId}
                      >
                        <dt className="mb-1 font-semibold text-gray-700 flex items-center gap-2">
                          <CheckSquare
                            size={18}
                            color="#1f861d"
                            weight="duotone"
                          />
                          {sheet.title}
                        </dt>
                        <dd className="text-sm font-medium flex gap-2 items-center">
                          <Key size={18} color="#1f861d" weight="duotone" />
                          {sheet.sheetId}
                        </dd>
                      </div>
                    </dl>
                  </h3>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="text-white bg-gray-600 hover:bg-gray-800 
                    focus:ring-4 focus:outline-none focus:ring-gray-200 
                    rounded-lg border border-gray-200 text-sm font-medium 
                    px-5 py-2.5 hover:text-white focus:z-10 mr-2 gap-1 inline-flex"
                  >
                    <XCircle size={20} />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      DeleteSheet(sheet.sheetId);
                    }}
                    className="text-white bg-red-600 hover:bg-red-800 
                    focus:ring-4 focus:outline-none focus:ring-red-300 
                    dark:focus:ring-red-800 font-medium rounded-lg text-sm 
                    inline-flex items-center px-5 py-2.5 text-center gap-1"
                  >
                    <Trash size={20} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      },
    });
  }

  async function DeleteApp() {
    try {
      const responsePromise = new Promise((resolve, reject) => {
        api
          .post(
            '/app',
            {
              action: 'delete',
              name: appName,
              appId,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(() => {
            resolve(navigate('/'));
          })
          .catch(() => reject);
      });
      toast.promise(responsePromise, {
        pending: 'Deleting app...',
        success: {
          render() {
            return <span className="text-lg text-green-700">App deleted</span>;
          },
          // other options
          icon: <Checks size={22} color="#1f861d" />,
        },
        error: {
          render() {
            return (
              <span className="text-red-500">Error on delete {appName}</span>
            );
          },
        },
      });
    } catch (error) {
      toast.error('Error on add new sheet!');
    }
  }

  function handleConfirmDeleteApp() {
    confirmAlert({
      // eslint-disable-next-line react/no-unstable-nested-components
      customUI: ({ onClose }) => {
        return (
          <div className="overflow-y-auto overflow-x-hidden  md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative bg-white rounded-lg shadow">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent
                   hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm
                    p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="popup-modal"
                >
                  <X size={22} />
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <div className="mx-auto mb-4 w-14 h-14 text-yellow-400">
                    <WarningCircle size={48} />
                  </div>
                  <h3 className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this APP? <br />
                    <p>The app and all sheets will be deleted</p>
                    <dl className="max-w-md text-gray-500 divide-y mt-2 divide-gray-400">
                      <div className="flex flex-col pb-3 pt-3" key={appName}>
                        <dt className="mb-1 font-semibold text-gray-700 flex items-center gap-2">
                          <CheckSquare
                            size={18}
                            color="#1f861d"
                            weight="duotone"
                          />
                          {appName}
                        </dt>
                      </div>
                    </dl>
                  </h3>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="text-white bg-gray-600 hover:bg-gray-800 
                    focus:ring-4 focus:outline-none focus:ring-gray-200 
                    rounded-lg border border-gray-200 text-sm font-medium 
                    px-5 py-2.5 hover:text-white focus:z-10 mr-2 gap-1 inline-flex"
                  >
                    <XCircle size={20} />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      DeleteApp();
                      onClose();
                    }}
                    className="text-white bg-red-600 hover:bg-red-800 
                    focus:ring-4 focus:outline-none focus:ring-red-300 
                    dark:focus:ring-red-800 font-medium rounded-lg text-sm 
                    inline-flex items-center px-5 py-2.5 text-center gap-1"
                  >
                    <Trash size={20} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      },
    });
  }

  return (
    <>
      <div className="flex items-center justify-between pb-4 border-b border-gray-300">
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
                <span className="ml-1 uppercase text-sm font-medium text-gray-900 md:ml-2">
                  APP: {appName}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <button
          type="button"
          onClick={handleConfirmDeleteApp}
          className="text-white gap-2 bg-red-400 hover:bg-red-600 
            border border-red-600 focus:ring-4 focus:outline-none
            transition-all duration-300  focus:ring-red-300 
            font-medium rounded-lg text-sm px-3 py-2 
            text-center inline-flex items-center"
        >
          <XCircle size={18} />
          Delete APP
        </button>
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
                    onClick={() => handleConfirmDeleteSheet(sheet)}
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
