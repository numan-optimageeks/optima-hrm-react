export default class LocalStorage {
  static SetItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  static GetItem(key: string): string | null {
    return localStorage.getItem(key);
  }
  static RemoveItem(key: string) {
    localStorage.removeItem(key);
  }
}
