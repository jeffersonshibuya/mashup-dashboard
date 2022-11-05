/* eslint-disable react/require-default-props */
import { Dialog, Transition } from '@headlessui/react';
import { Copy, X } from 'phosphor-react';
import { Fragment } from 'react';
import { toast } from 'react-toastify';
import { ServerData } from '../types';

interface Props {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
  serverInfo: ServerData;
}

export default function ServerInfoModal({
  isOpen,
  setIsOpen,
  serverInfo,
}: Props) {
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
              <Dialog.Panel
                className="w-full max-w-lg p-6 overflow-hidden text-left 
              align-middle transition-all transform bg-white shadow-xl 
              rounded-2xl dark:bg-gray-900 dark:text-white"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 flex 
                    justify-between items-center border-b border-gray-400 pb-3"
                >
                  <span>Server Info</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="py-2 px-2 hover:bg-gray-400 rounded hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </Dialog.Title>
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm  text-gray-900 truncate dark:text-white">
                            Name
                          </p>
                          <p className="text-gray-500 font-medium truncate ">
                            {serverInfo.name}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">Server URL</p>
                          <p className="font-medium text-gray-500 truncate">
                            {serverInfo.serverUrl}
                          </p>
                        </div>
                      </div>
                    </li>
                    {serverInfo.webIntegrationId && (
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm  text-gray-900 truncate dark:text-white">
                              Web Integration ID
                            </p>
                            <p className="font-medium text-gray-500 truncate">
                              {serverInfo.webIntegrationId}
                            </p>
                          </div>
                          <div
                            className="inline-flex items-center text-base 
                          font-semibold text-gray-900 dark:text-white"
                          >
                            <Copy
                              onClick={() => {
                                toast.success(`Web Integration ID Copied!`);
                                navigator.clipboard.writeText(
                                  serverInfo.webIntegrationId
                                );
                              }}
                              size={20}
                              weight="bold"
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </li>
                    )}
                    {serverInfo.anonUrl && (
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm  text-gray-900 truncate dark:text-white">
                              Anon URL
                            </p>
                            <p
                              className="font-medium 
                            dark:text-gray-500 text-gray-900"
                            >
                              {serverInfo.anonUrl}
                            </p>
                          </div>
                          <div
                            className="inline-flex items-center text-base 
                          font-semibold text-gray-900 dark:text-white"
                          >
                            <Copy
                              onClick={() => {
                                toast.success(`Anon URL Copied!`);
                                navigator.clipboard.writeText(
                                  serverInfo.anonUrl
                                );
                              }}
                              size={20}
                              weight="bold"
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
