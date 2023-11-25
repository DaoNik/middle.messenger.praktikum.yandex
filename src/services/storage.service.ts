import { isPrimitive } from '../utils';

export class StorageService {
  static __instance: StorageService;

  constructor() {
    if (StorageService.__instance) {
      return StorageService.__instance;
    }

    StorageService.__instance = this;
  }

  async getItem<T>(key: string): Promise<T | null> {
    const raw = localStorage.getItem(key);

    if (!raw) return null;

    try {
      const value = JSON.parse(raw);

      return value as T;
    } catch {
      return null;
    }
  }

  async setItem(key: string, value: unknown): Promise<void> {
    const result = isPrimitive(value) ? String(value) : JSON.stringify(value);

    localStorage.setItem(key, result);
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}
