/* eslint-disable react/require-default-props */
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircle, CircleNotch, X } from 'phosphor-react';
import { Fragment, useState } from 'react';
import { Input } from './Form/Input';

interface Props {
  isOpen: boolean;
  loading?: boolean;
  setIsOpen: (status: boolean) => void;
  handleSave: (data: { title: string; sheetId: string }) => void;
}

export default function AddSheetModal({
  isOpen,
  setIsOpen,
  loading,
  handleSave,
}: Props) {
  const [title, setTitle] = useState('');
  const [sheetId, setSheetId] = useState('');

  function handleAddNewSheet() {
    handleSave({ title, sheetId });
    setTitle('');
    setSheetId('');
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex 
                    justify-between items-center"
                >
                  <span>Add Sheet</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="py-2 px-2 hover:bg-gray-400 rounded hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </Dialog.Title>
                <div className="my-4">
                  <label htmlFor="sheetId">Sheet ID</label>
                  <Input
                    id="sheetId"
                    placeholder="Sheet ID"
                    value={sheetId}
                    onChange={(e) => setSheetId(e.target.value)}
                  />
                </div>

                <div className="my-4">
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    placeholder="Sheet Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="flex px-4 py-2 text-sm 
                    font-medium text-green-700 bg-white border 
                    rounded-md hover:bg-green-600 
                    hover:text-white items-center border-green-600
                    focus:outline-none focus-visible:ring-2  gap-2
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleAddNewSheet}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
