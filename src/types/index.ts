export type mashupConfigData = {
  server: string;
  name: string;
  appId: string;
  isCloud?: boolean;
  isAnonAccess?: boolean;
  webIntegrationId?: string;
  sheets: sheetsResponseData[];
};

export type sheetsResponseData = {
  sheetId: string;
  title: string;
};

export type appsDataType = mashupConfigData[];
