export enum DeviceType {
  DESKTOP = 'Desktop',
  LAPTOP = 'Laptop',
  TABLET = 'Tablet',
  MOBILE = 'Mobile'
}

export interface Preset {
  id: string;
  name: string;
  width: number;
  height: number;
  type: DeviceType;
}

export interface AppState {
  url: string;
  scale: number;
  inputUrl: string;
}