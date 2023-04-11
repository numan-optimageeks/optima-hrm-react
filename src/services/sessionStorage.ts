export default class SessionStorage {
  static SetItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }
  static GetItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }
  static RemoveItem(key: string) {
    sessionStorage.removeItem(key);
  }
}
