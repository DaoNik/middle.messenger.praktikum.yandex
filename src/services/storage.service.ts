import { isPrimitive } from '../utils';

export class StorageService {
  static __instance: StorageService;

  constructor() {
    if (StorageService.__instance) {
      return StorageService.__instance;
    }

    StorageService.__instance = this;
  }

  async getItem(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  async setItem(key: string, value: unknown): Promise<void> {
    let result = isPrimitive(value) ? String(value) : JSON.stringify(value);

    localStorage.setItem(key, result);
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}
