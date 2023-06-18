export class EventBus {
  private _listeners: Record<string, Array<(...parameters: any[]) => void>> =
    {};

  on(event: string, callback: (...parameters: any[]) => void): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }
  off(event: string, callback: unknown): void {
    if (!this._listeners[event]) {
      throw new Error('Нет такого события');
    }

    this._listeners[event] = this._listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit<T>(event: string, ...parameters: T[]): void {
    if (!this._listeners[event]) {
      throw new Error('Нет такого события');
    }

    for (const listener of this._listeners[event]) {
      listener(...parameters);
    }
  }
}
