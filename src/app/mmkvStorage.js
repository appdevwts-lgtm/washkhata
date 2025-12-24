import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'redux-storage',
  encryptionKey: 'my-secret-key',
});
