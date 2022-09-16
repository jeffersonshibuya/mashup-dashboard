export type mashupConfigData = {
  host: string;
  name: string;
  appId: string;
  sheets: sheetsResponseData[];
};

export type sheetsResponseData = {
  sheetId: string;
  title: string;
};

export type appsDataType = mashupConfigData[];
