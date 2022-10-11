import { AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Checks,
  CheckSquare,
  Globe,
  HardDrives,
  MagnifyingGlass,
  Pencil,
  PlusCircle,
  Trash,
  WarningCircle,
  X,
  XCircle,
} from 'phosphor-react';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import ServerInfoModal from '../components/ServerInfoModal';
import FormServer from '../partials/FormServer';
import { api } from '../services/api';
import { ServerData, ServersDataType } from '../types';

function Servers() {
  const [servers, setServers] = useState<ServersDataType>([]);

  const [isAddNewServer, setIsAddNewServer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [serverInfo, setServerInfo] = useState({} as ServerData);
  const [serverSelected, setServerSelected] = useState<ServerData>(
    {} as ServerData
  );

  const emptyServerData = {
    name: '',
    anonUrl: '',
    isCloud: false,
    isAnonAccess: false,
    serverUrl: '',
    webIntegrationId: '',
  } as ServerData;

  async function getServersList() {
    setLoading(true);
    const serversResponse = await api.post<ServersDataType>(
      '/servers',
      {
        action: 'list',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    setLoading(false);
    return serversResponse.data;
  }

  function handleEditServer(serverData: ServerData) {
    setServerSelected(serverData);
    setIsAddNewServer(true);
  }

  function handleCancelForm() {
    setServerSelected(emptyServerData);
    setIsAddNewServer(false);
  }

  async function handleUpdateServersList() {
    const serversList = await getServersList();
    setServers(serversList);
    handleCancelForm();
  }

  function handleShowServerInfoModal(server: ServerData) {
    setServerInfo(server);
    setOpenModal(true);
  }

  async function DeleteServer(serverName: string) {
    try {
      const responsePromise = new Promise((resolve, reject) => {
        api
          .post(
            '/servers',
            {
              action: 'delete',
              name: serverName,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(async () => {
            const serversList = await getServersList();
            setServers(serversList);
            resolve('');
          })
          .catch(() => reject);
      });
      toast.promise(responsePromise, {
        pending: 'Deleting server...',
        success: {
          render() {
            return (
              <span className="text-lg text-green-700">Server deleted</span>
            );
          },
          // other options
          icon: <Checks size={22} color="#1f861d" />,
        },
        error: {
          render() {
            return (
              <span className="text-red-500">Error on delete {serverName}</span>
            );
          },
        },
      });
    } catch (error) {
      toast.error('Error on delete server!');
    }
  }

  function handleConfirmDeleteServer(server: ServerData) {
    confirmAlert({
      // eslint-disable-next-line react/no-unstable-nested-components
      customUI: ({ onClose }) => {
        return (
          <div
            className="overflow-y-auto overflow-x-hidden  md:inset-0 h-modal 
            md:h-full"
          >
            <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
              <div
                className="relative bg-white rounded-lg shadow border 
              border-gray-200"
              >
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
                    Are you sure you want to delete this server? <br />
                    <dl className="max-w-md text-gray-500 divide-y mt-2 divide-gray-400">
                      <div
                        className="flex flex-col pb-3 pt-3"
                        key={server.name}
                      >
                        <dt className="mb-1 font-semibold text-gray-700 flex items-center gap-2">
                          <CheckSquare
                            size={18}
                            color="#1f861d"
                            weight="duotone"
                          />
                          Name: {server.name}
                        </dt>
                        <dd className="font-medium flex gap-2 items-center text-gray-700">
                          <Globe size={18} color="#1f861d" weight="duotone" />
                          URL: {server.serverUrl}
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
                      DeleteServer(server.name);
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

  useEffect(() => {
    async function init() {
      const serversList = await getServersList();
      setServers(serversList);
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
                    text-gray-800 dark:text-white"
              >
                <HardDrives weight="fill" className="mr-1" />
                Servers
              </span>
            </li>
          </ol>
        </nav>
        <button
          type="button"
          onClick={() => setIsAddNewServer(true)}
          className="text-blue-500 bg-white gap-2 hover:bg-blue-400 
            border border-blue-200 focus:ring-4 focus:outline-none 
            focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 
            text-center inline-flex items-center mr-2 hover:text-white"
        >
          <PlusCircle size={16} />
          Add New Server
        </button>
      </div>
      {openModal && (
        <ServerInfoModal
          serverInfo={serverInfo}
          isOpen={openModal}
          setIsOpen={setOpenModal}
        />
      )}
      <AnimatePresence>
        {isAddNewServer && (
          <FormServer
            serverSelected={serverSelected || emptyServerData}
            onCancel={handleCancelForm}
            onUpdateServersList={handleUpdateServersList}
          />
        )}
      </AnimatePresence>
      <div
        className="overflow-x-auto shadow-lg rounded-lg border 
        border-gray-300"
      >
        <table
          className="w-full table-fixed text-sm text-left text-gray-800
        dark:bg-gray-900 dark:text-white"
        >
          <thead className="text-xs uppercase border-b border-gray-300">
            <tr>
              <th scope="col" className="py-4 px-6">
                Server
              </th>
              <th scope="col" className="py-4 px-6">
                Server URL
              </th>
              <th scope="col" className="py-4 px-6">
                Anon Access
              </th>
              <th scope="col" className="py-4 px-6">
                Web Integration ID
              </th>
              <th scope="col" className="py-4 px-6">
                Anon URL
              </th>
              <th scope="col" className="py-4 px-6" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="justify-center items-center">
                <th colSpan={5} className="h-[200px]">
                  <div className="text-center">
                    <div role="status">
                      <svg
                        className="inline mr-2 w-8 h-8 text-gray-200 animate-spin 
                        dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </th>
              </tr>
            ) : (
              servers?.map((serverData) => (
                <tr className="border-b" key={serverData.name}>
                  <th scope="row" className="py-3 px-6 font-medium">
                    {serverData.name}
                  </th>
                  <th scope="row" className="py-3 px-6 font-medium">
                    {serverData.serverUrl}
                  </th>
                  <td className="py-3 px-6">
                    {serverData.isAnonAccess ? (
                      <CheckCircle size={20} className="text-green-600" />
                    ) : (
                      <XCircle size={20} className="text-red-500" />
                    )}
                  </td>
                  <td className="py-3 px-6 truncate">
                    {serverData.webIntegrationId ? (
                      serverData.webIntegrationId
                    ) : (
                      <XCircle size={20} className="text-red-500" />
                    )}
                  </td>
                  <td className="py-3 px-6 truncate ">
                    {serverData.anonUrl ? (
                      serverData.anonUrl
                    ) : (
                      <XCircle size={20} className="text-red-500" />
                    )}
                  </td>
                  <td className="py-3 px-6 justify-end flex items-center">
                    <button
                      type="button"
                      onClick={() => handleShowServerInfoModal(serverData)}
                      className="text-green-500 border border-green-200 hover:text-white 
                      hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 
                      font-medium rounded-lg text-sm p-1.5 text-center inline-flex 
                      items-center mr-2
                      "
                    >
                      <MagnifyingGlass size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditServer(serverData)}
                      className="text-blue-400 border border-blue-200 hover:text-white 
                      hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 
                      font-medium rounded-lg text-sm p-1.5 text-center inline-flex 
                      items-center mr-2
                      "
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleConfirmDeleteServer(serverData)}
                      className="text-red-500 border border-red-200 hover:text-white 
                      hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 
                      font-medium rounded-lg text-sm p-1.5 text-center inline-flex 
                      items-center mr-2
                      "
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Servers;
