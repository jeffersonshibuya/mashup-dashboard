import {
  CheckSquare,
  Cloud,
  ComputerTower,
  Copy,
  Key,
  LinkSimple,
  ListChecks,
  Lock,
  LockKeyOpen,
  Pencil,
} from 'phosphor-react';
import * as Tabs from '@radix-ui/react-tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sheetsResponseData } from '../types';

interface AppCardProps {
  appId: string;
  appName: string;
  serverName: string;
  serverUrl: string;
  isCloud: boolean;
  isAnonAccess: boolean;
  sheets: sheetsResponseData[];
}

function AppCard({
  appId,
  appName,
  serverName,
  serverUrl,
  sheets,
  isCloud,
  isAnonAccess,
}: AppCardProps) {
  const navigate = useNavigate();

  function handleAppEdit() {
    navigate(`/app-edit`, {
      state: {
        appId,
        appName,
        serverName,
        sheets,
      },
    });
  }

  return (
    <div
      className="w-full bg-white rounded-lg border border-gray-300 
        shadow-lg p-4 dark:bg-gray-800 dark:text-white dark:border-gray-600"
    >
      <div className="flex flex-1 items-center justify-between mb-4">
        <h5 className="flex font-bold dark:text-white text-gray-600">
          {appName}
        </h5>
        <button
          type="button"
          onClick={handleAppEdit}
          className="flex text-sm items-center gap-2 border-solid
            rounded transition-all duration-200 font-normal
            dark:bg-gray-900 bg-blue-400 hover:bg-blue-600 px-2 py-1 
            text-white"
        >
          <Pencil onClick={handleAppEdit} size={18} />
          Edit
        </button>
      </div>
      <Tabs.Tabs defaultValue="tab1">
        <Tabs.TabsList className="flex" aria-label="app info">
          <Tabs.TabsTrigger
            className="h-11 flex-1 px-5 items-center border-b border-gray-400
             justify-center dark:border-gray-900"
            value="tab1"
          >
            APP Info
          </Tabs.TabsTrigger>
          <Tabs.TabsTrigger
            className="h-11 flex-1 px-5 items-center border-b border-gray-400
            dark:border-gray-900"
            value="tab2"
          >
            Sheets
            <span
              className="bg-green-200 dark:bg-green-400 text-green-800 text-sm font-medium 
              ml-2 px-2.5 py-0.5 rounded"
            >
              {sheets.length}
            </span>
          </Tabs.TabsTrigger>
        </Tabs.TabsList>
        <Tabs.TabsContent value="tab1" className="border-none h-[200px]">
          <ul className="my-5 space-y-5 ">
            <li className="flex space-x-3 items-center">
              <Key
                size={24}
                className="text-gray-900 dark:text-gray-400"
                weight="duotone"
              />
              <span
                className="w-full flex flex-1 justify-between font-semibold 
                leading-tight text-gray-600 dark:text-gray-300"
              >
                {appId}
                <Copy
                  onClick={() => {
                    toast.success(`App ID Copied!`);
                    navigator.clipboard.writeText(appId);
                  }}
                  size={18}
                  weight="bold"
                  className="cursor-pointer"
                />
              </span>
            </li>
            <li className="flex space-x-3 items-center">
              {isCloud ? (
                <Cloud size={24} className="text-green-600" weight="duotone" />
              ) : (
                <ComputerTower
                  size={24}
                  className="text-gray-600 dark:text-gray-400"
                  weight="duotone"
                />
              )}
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-col font-semibold text-gray-600 dark:text-gray-300">
                  {serverName}
                  <span className="text-gray-500 text-sm dark:text-gray-500">
                    {serverUrl}
                  </span>
                </div>
                <Copy
                  onClick={() => {
                    toast.success(`Server URL Copied!`);
                    navigator.clipboard.writeText(serverUrl);
                  }}
                  size={18}
                  weight="bold"
                  className="cursor-pointer text-gray-600"
                />
              </div>
            </li>
            {isCloud && (
              <li className="flex space-x-3 items-center">
                {isAnonAccess ? (
                  <>
                    <LockKeyOpen
                      size={24}
                      className="text-green-800"
                      weight="duotone"
                    />
                    <span
                      className="w-full flex flex-1 justify-between font-semibold 
                      leading-tight text-gray-600 dark:text-gray-300"
                    >
                      Anon Access
                    </span>
                  </>
                ) : (
                  <>
                    <Lock
                      size={24}
                      className="text-green-800"
                      weight="duotone"
                    />
                    <span
                      className="w-full flex flex-1 justify-between font-semibold 
                      leading-tight text-gray-600"
                    >
                      Restricted Access.
                    </span>
                  </>
                )}
              </li>
            )}
            <li className="flex space-x-3 items-center">
              <LinkSimple
                size={24}
                className="text-blue-300"
                weight="regular"
              />
              <a
                href={`https://informed-by-data.ipc-global.com/${appName}`}
                target="_blank"
                className="flex justify-between font-semibold transition-all duration-300
              leading-tight text-blue-500 hover:text-blue-800"
                rel="noreferrer"
              >
                view site
              </a>
            </li>
          </ul>
        </Tabs.TabsContent>
        <Tabs.TabsContent
          value="tab2"
          className="border-none h-[200px] overflow-y-auto mb-4"
        >
          <dl className="max-w-md text-gray-500 dark:text-gray-400 divide-y mt-4 divide-gray-400">
            {sheets.length === 0 && (
              <div className="flex gap-2 items-center dark:text-gray-300 text-gray-600 text-sm">
                <ListChecks size={18} />
                All sheets will be displayed
              </div>
            )}
            {sheets.map((sheet) => (
              <div className="flex flex-col pb-3 pt-3" key={sheet.sheetId}>
                <dt
                  className="mb-1 font-semibold text-gray-700 dark:text-white 
                  text-lg flex items-center gap-2"
                >
                  <CheckSquare size={18} color="#1f861d" weight="duotone" />
                  {sheet.title}
                </dt>
                <dd className="text-sm font-medium flex gap-2 items-center">
                  <Key size={18} color="#1f861d" weight="duotone" />
                  {sheet.sheetId}
                </dd>
              </div>
            ))}
          </dl>
        </Tabs.TabsContent>
      </Tabs.Tabs>
    </div>
  );
}

export default AppCard;
