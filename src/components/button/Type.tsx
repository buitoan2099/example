import {TextProps} from '@components/text/Types';
import type {Key} from 'react';
import {ReactNode} from 'react';
import {ColorValue, ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {BaseProps, TouchableProps} from 'src/commons/types';

export interface ButtonProps extends TouchableProps {
  discriminator?: 'ButtonProps';
  width?: Key;
  height?: Key;
  borderRadius?: number;
  titleStyle?: TextStyle;
  titleColor?: ColorValue;
  titleDisableColor?: ColorValue;
  titleProps?: TextProps;
}

export interface ButtonGroupProps extends BaseProps {
  children?: (string | JSX.Element)[] | ReactNode;
  containerStyle?: ViewStyle | TextStyle | ImageStyle;
  label?: string | JSX.Element | JSX.Element[] | ReactNode;
  labelStyle?: ViewStyle | TextStyle;
  labelProps?: TextProps;
  iconFocusColor?: ColorValue;
  labelFocusColor?: ColorValue;
  selectMultiple?: boolean; // Neu cho phep chon nhieu button set = true. Nguoc lai false. Default = false
  titleColor?: ColorValue;
  titleFocusColor?: ColorValue;
  titleDisableColor?: ColorValue;
  disableIndexs?: number[]; // vi tri cac button bi disable
  currentIndexs?: number[]; // vi tri ban ban dau duoc lua chon
}

export interface ButtonViewProps extends ButtonProps {
  isOutline?: boolean;
  style?: ViewStyle | TextStyle | ImageStyle;
}
