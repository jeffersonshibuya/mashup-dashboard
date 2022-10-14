import { ServersDataType } from '../types';
import { api } from './api';

export async function fetchServers() {
  const response = await api.post<ServersDataType>(
    '/servers',
    {
      action: 'list',
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}
