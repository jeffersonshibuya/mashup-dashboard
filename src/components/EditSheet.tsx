import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import { Input } from './Form/Input';

interface Props {
  appName: string;
  sheetId: string;
  title: string;
  // openSheetDialog: (status: boolean) => void;
}

function EditSheet({ appName, sheetId, title }: Props) {
  const [newTitle, setNewTitle] = useState(title);

  function handleSaveSheet(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    api
      .post('/sheets', {
        action: 'create-update',
        name: appName,
        sheetId,
        title: newTitle,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <form className="mt-8 flex flex-col gap-4" onSubmit={handleSaveSheet}>
      <div className="flex flex-col gap-2">
        <label className="font-semibold " htmlFor="server">
          Title
        </label>
        <Input
          id="server"
          placeholder="Server"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <footer className="mt-4 flex justify-end gap-4">
        <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded font-semibold hover:bg-zinc-600">
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

export default EditSheet;
