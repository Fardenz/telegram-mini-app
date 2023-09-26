export default class Settings {
  public static apiUrl(): string {
    return import.meta.env.VITE_API_URL
  }
}
