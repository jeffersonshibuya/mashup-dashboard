export type mashupConfigData = {
  server: string;
  name: string;
  appId: string;
  isCloud?: boolean;
  isAnonAccess?: boolean;
  webIntegrationId?: string;
  sheets: sheetsResponseData[];
  anonUrl?: string;
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
