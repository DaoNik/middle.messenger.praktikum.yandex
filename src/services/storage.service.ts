import { isPrimitive } from '../utils';

export class StorageService {
  static __instance: StorageService;

  constructor() {
    if (StorageService.__instance) {
      return StorageService.__instance;
    }

    StorageService.__instance = this;
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: unknown): void {
    let result = isPrimitive(value) ? String(value) : JSON.stringify(value);

    localStorage.setItem(key, result);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
