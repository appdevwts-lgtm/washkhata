import { storage } from './mmkvStorage';

export const mmkvPersistStorage = {
  setItem: async (key, value) => {
    try {
      storage.set(key, value);
      return true;
    } catch (error) {
      console.error('MMKV setItem error:', error);
      throw error;
    }
  },
  getItem: async (key) => {
    try {
      const value = storage.getString(key);
      return value ?? undefined;
    } catch (error) {
      console.error('MMKV getItem error:', error);
      return undefined;
    }
  },
  removeItem: async (key) => {
    try {
      storage.delete(key);
    } catch (error) {
      console.error('MMKV removeItem error:', error);
      throw error;
    }
  },
};
