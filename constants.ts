import { DeviceType, Preset } from './types';

export const PRESETS: Preset[] = [
  {
    id: 'desktop-hd',
    name: 'Desktop HD',
    width: 1920,
    height: 1080,
    type: DeviceType.DESKTOP,
  },
  {
    id: 'laptop',
    name: 'Laptop',
    width: 1440,
    height: 900,
    type: DeviceType.LAPTOP,
  },
  {
    id: 'laptop-small',
    name: 'Small Laptop',
    width: 1366,
    height: 768,
    type: DeviceType.LAPTOP,
  },
  {
    id: 'tablet-portrait',
    name: 'Tablet Portrait',
    width: 768,
    height: 1024,
    type: DeviceType.TABLET,
  },
  {
    id: 'tablet-landscape',
    name: 'Tablet Landscape',
    width: 1024,
    height: 768,
    type: DeviceType.TABLET,
  },
  {
    id: 'mobile-large',
    name: 'Mobile Large',
    width: 414,
    height: 896,
    type: DeviceType.MOBILE,
  },
  {
    id: 'mobile-std',
    name: 'Mobile Standard',
    width: 375,
    height: 667,
    type: DeviceType.MOBILE,
  },
];

export const DEFAULT_URL = 'http://localhost:3000';
export const INITIAL_SCALE = 0.4;
export const MIN_SCALE = 0.1;
export const MAX_SCALE = 1.0;