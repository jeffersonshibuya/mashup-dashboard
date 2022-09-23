import { CheckCircle, ComputerTower, Key, Pencil } from 'phosphor-react';
import * as Tabs from '@radix-ui/react-tabs';
import { useNavigate } from 'react-router-dom';
import { sheetsResponseData } from '../types';

interface AppCardProps {
  appId: string;
  appName: string;
  server: string;
  sheets: sheetsResponseData[];
}

function AppCard({ appId, appName, server, sheets }: AppCardProps) {
  const navigate = useNavigate();

  function handleAppEdit() {
    navigate(`/app-edit`, {
      state: {
        appId,
        appName,
        server,
        sheets,
      },
    });
  }

  return (
    <div className="p-2 w-full bg-white rounded-lg border shadow-md sm:p-4">
      <h5 className="mb-4 uppercase flex justify-between text-xl font-semibold text-gray-600">
        APP: {appName}
        <Pencil onClick={handleAppEdit} />
      </h5>
      <Tabs.Tabs defaultValue="tab1">
        <Tabs.TabsList className="flex" aria-label="app info">
          <Tabs.TabsTrigger
            className="h-11 flex-1 px-5 items-center border-b border-gray-400
             justify-center"
            value="tab1"
          >
            APP Info
          </Tabs.TabsTrigger>
          <Tabs.TabsTrigger
            className="h-11 flex-1 px-5 items-center border-b border-gray-400"
            value="tab2"
          >
            Sheets
          </Tabs.TabsTrigger>
        </Tabs.TabsList>
        <Tabs.TabsContent value="tab1" className="border-none h-[200px]">
          <ul className="my-5 space-y-5">
            <li className="flex space-x-3 items-center">
              <Key size={24} className="text-gray-900" />
              <span
                className="w-full flex flex-1 justify-between font-semibold 
              leading-tight text-gray-600"
              >
                {appId}
              </span>
            </li>
            <li className="flex space-x-3 items-center">
              <ComputerTower size={24} className="text-zinc-900" />
              <span
                className="w-full flex flex-1 justify-between font-semibold 
              leading-tight text-gray-600"
              >
                {server}
              </span>
            </li>
          </ul>
        </Tabs.TabsContent>
        <Tabs.TabsContent
          value="tab2"
          className="border-none h-[200px] overflow-y-auto mb-4"
        >
          <ul className="my-3 space-y-5">
            {sheets.map((sheet) => (
              <li className="space-x-3" key={sheet.sheetId}>
                <div className="flex flex-1 justify-between mr-2">
                  <div className="flex flex-1 items-center gap-3">
                    <CheckCircle size={20} className="text-green-700" />
                    <div className="flex flex-1 flex-col">
                      <span
                        className="text-base font-semibold leading-tight 
                      text-gray-600 "
                      >
                        {sheet.title}
                      </span>
                      <span
                        className="flex flex-1 items-center justify-between leading-tight 
                          text-gray-400"
                      >
                        {sheet.sheetId}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Tabs.TabsContent>
      </Tabs.Tabs>
    </div>
  );
}

export default AppCard;
