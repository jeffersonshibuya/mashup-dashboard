import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import { Input } from './Form/Input';

interface Props {
  appName: string;
  appId: string;
  server: string;
}

function EditApp({ appName, appId, server }: Props) {
  const [appIdUpdated, setAppIdUpdated] = useState(appId);
  const [serverName, setServerName] = useState(server);

  function handleSaveSheet(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    api.post('/sheets', {
      action: 'create-update',
      name: appName,
      sheetId: appIdUpdated,
      server: serverName,
    });
  }

  return (
    <form className="mt-8 flex flex-col gap-4" onSubmit={handleSaveSheet}>
      <div className="flex flex-col gap-2">
        <label className="font-semibold " htmlFor="appId">
          App ID
        </label>
        <Input
          id="appId"
          placeholder="App ID"
          value={appIdUpdated}
          onChange={(e) => setAppIdUpdated(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold " htmlFor="server">
          Server
        </label>
        <Input
          id="server"
          placeholder="Server"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
        />
      </div>
      <footer className="mt-4 flex justify-end gap-4">
        <Dialog.Close
          className="bg-zinc-500 px-5 h-12 rounded font-semibold
            hover:bg-zinc-600"
        >
          Cancel
        </Dialog.Close>
        <button
          className="bg-violet-500 px-5 h-12 flex items-center 
            rounded font-semibold gap-3 hover:bg-violet-600"
          type="submit"
        >
          <CheckCircle size={24} />
          Save
        </button>
      </footer>
    </form>
  );
}

export default EditApp;
