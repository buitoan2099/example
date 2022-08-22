import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const CheckUtils = {
  isIOS: (): boolean => {
    return Platform.OS === 'ios';
  },
  isAndroid: (): boolean => {
    return Platform.OS === 'android';
  },
  isTablet: (): boolean => {
    return DeviceInfo.isTablet();
  },
  isLandscape: (): boolean => {
    return DeviceInfo.isLandscapeSync();
  },
  isNumber: (value: string | number): boolean => {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  },
};

export default CheckUtils;
