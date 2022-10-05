export type mashupConfigData = {
  server: ServerData;
  name: string;
  appId: string;
  sheets: sheetsResponseData[];
};

export type ServerData = {
  name: string;
  serverUrl: string;
  isCloud: boolean;
  isAnonAccess: boolean;
  webIntegrationId: string;
  anonUrl: string;
};

export type sheetsResponseData = {
  sheetId: string;
  title: string;
};

export type User = {
  name: string;
  email: string;
};

export type UserAuthContextType = {
  user: User;
  handleSignOut: () => void;
};

export type appsDataType = mashupConfigData[];
export type ServersDataType = ServerData[];
