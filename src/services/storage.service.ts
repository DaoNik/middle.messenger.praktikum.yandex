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
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
