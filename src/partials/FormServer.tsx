import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  CircleNotch,
  Cloud,
  ComputerTower,
  Globe,
  IdentificationCard,
  LinkSimple,
  XCircle,
} from 'phosphor-react';
import { toast } from 'react-toastify';
import { Input } from '../components/Form/Input';
import { api } from '../services/api';
import { ServerData } from '../types';
import { fadeIn } from '../utils/animation';

interface Props {
  onCancel: () => void;
  onUpdateServersList: () => void;
  serverSelected: ServerData;
}

function FormServer({ onCancel, onUpdateServersList, serverSelected }: Props) {
  const [loading, setLoading] = useState(false);
  const [serverName, setServerName] = useState(serverSelected?.name);
  const [serverUrl, setServerUrl] = useState(serverSelected?.serverUrl);
  const [webIntegrationId, setWebIntegrationId] = useState(
    serverSelected?.webIntegrationId
  );
  const [anonUrl, setAnonUrl] = useState(serverSelected?.anonUrl);
  const [isAnonAccess, setIsAnonAccess] = useState(
    serverSelected?.isAnonAccess
  );

  async function handleSaveServer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/servers', {
        action: 'create-update',
        name: serverName,
        serverUrl,
        isCloud: serverUrl.includes('qlikcloud'),
        isAnonAccess,
        webIntegrationId,
        anonUrl,
      });

      toast.success(`Server ${serverName} added`);
      onUpdateServersList();
    } catch (error) {
      toast.error('Error on add/update server info');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      variants={fadeIn}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="flex-col"
      onSubmit={handleSaveServer}
    >
      <div
        className="flex justify-between border-b border-gray-400 
           items-center my-2 pb-2"
      >
        <h1>Server Info</h1>
      </div>
      <ul className="my-3 space-y-5">
        <li className="flex space-x-3 items-center">
          <IdentificationCard
            size={24}
            className="text-gray-900 dark:text-gray-400"
          />
          <span
            className="w-full flex flex-1 justify-between font-semibold 
            leading-tight text-gray-600"
          >
            <Input
              id="name"
              name="name"
              placeholder="Name..."
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
          </span>
        </li>
        <li className="flex space-x-3 items-center">
          {serverUrl?.includes('qlikcloud') ? (
            <Cloud size={24} className="text-green-600" weight="duotone" />
          ) : (
            <ComputerTower
              size={24}
              className="text-green-600"
              weight="duotone"
            />
          )}
          <Input
            id="serverUrl"
            placeholder="Server URL.."
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
          />
          {serverUrl?.includes('qlikcloud') && (
            <div className="flex flex-1 items-center mr-4">
              <Globe size={24} className="text-gray-900" />
              <span className="ml-2 flex-1 text-md font-medium ">
                <Input
                  id="webIntegragrationId"
                  name="webIntegrationId"
                  placeholder="Web Intengration ID..."
                  value={webIntegrationId}
                  onChange={(e) => setWebIntegrationId(e.target.value)}
                />
              </span>
            </div>
          )}
        </li>
        {serverUrl?.includes('qlikcloud') && (
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
                className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Allow anon access
              </label>
            </div>
            {isAnonAccess && (
              <div className="flex items-center mr-4 col-span-3">
                <LinkSimple size={24} className="text-gray-900" />
                <span className="flex-1 ml-2 text-md font-medium text-gray-900">
                  <Input
                    id="anonUrl"
                    name="anonUrl"
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
      <div className="flex justify-end items-center gap-2">
        <button
          onClick={onCancel}
          disabled={loading}
          type="button"
          className="text-gray-700 gap-2 bg-white hover:bg-gray-600 
            border border-gray-600 focus:ring-4 focus:outline-none 
            focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 
            text-center inline-flex items-center hover:text-white"
        >
          <XCircle size={18} />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="text-green-700 gap-2 bg-white hover:bg-green-600 
              border border-green-600 focus:ring-4 focus:outline-none 
              focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 
              text-center inline-flex items-center hover:text-white"
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
      <hr className="my-4" />
    </motion.form>
  );
}

export default FormServer;
