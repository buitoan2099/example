import {Dimensions} from 'react-native';
import CheckUtils from './CheckUtils';
import Config from 'react-native-config';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidBaseWidthPhone = Number(Config.SIZE_BASE_WIDTH_PHONE) || 360;
const guidBaseHeightPhone = Number(Config.SIZE_BASE_HEIGHT_PHONE) || 720;

const guidBaseWidthTablet = Number(Config.SIZE_BASE_WIDTH_TABLET) || 768;
const guidBaseHeightTablet = Number(Config.SIZE_BASE_HEIGHT_TABLET) || 1024;

export const scale = (sizePhone: number, sizeTablet?: number): number => {
  if (!sizeTablet || !CheckUtils.isNumber(sizeTablet)) {
    sizeTablet = sizePhone;
  }
  if (CheckUtils.isTablet()) {
    return (shortDimension / guidBaseWidthTablet) * sizeTablet;
  }
  return (shortDimension / guidBaseWidthPhone) * sizePhone;
};

// export const verticalScale = (size: number): number => {
//   const baseHeight = CheckUtils.isTablet()
//     ? guidBaseHeightTablet
//     : guidBaseHeightPhone;
//   return (longDimension / baseHeight) * size;
// };

export const verticalScale = (size: number): number => {
  const baseHeight = CheckUtils.isTablet()
    ? guidBaseHeightTablet
    : guidBaseHeightPhone;
  const normalSize = (longDimension / baseHeight) * size;

  return size + (normalSize - size) * 0.5;
};

export const moderateScale = (
  sizePhone: number,
  sizeTablet: number,
  factor = 0.5,
): number => {
  if (!CheckUtils.isNumber(sizeTablet)) {
    sizeTablet = sizePhone;
  }
  const size = CheckUtils.isTablet() ? sizeTablet : sizePhone;
  return size + (scale(sizePhone, sizeTablet) - size) * factor;
};
export const resize = (sizePhone: number, sizeTablet: number) =>
  CheckUtils.isTablet() ? sizeTablet || sizePhone : sizePhone;

export const resizeRotation = (
  sizePhone: number,
  sizeTablet1: number,
  sizeTablet2: number,
): number => {
  return ms(sizePhone, CheckUtils.isLandscape() ? sizeTablet2 : sizeTablet1);
};
export const s = scale;
export const ms = moderateScale;
export const vs = verticalScale;
export const rs = resize;
export const rsr = resizeRotation;
