import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { TimeInMilliseconds } from './seconds';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: TimeInMilliseconds.OneDay,
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export const createSessionPersister = (key: string, storage: Storage) =>
  createAsyncStoragePersister({
    key: `${key}:Query`,
    storage,
  });
