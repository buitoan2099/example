import {TextProps} from '@components/text/Types';
import React from 'react';
import {
  ImageProps,
  ImageStyle,
  StyleProp,
  TextProps as RNTextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {BaseProps, TransferData} from 'src/commons/types';

export type HeaderSimpleProps = BaseProps & {
  backIcon?: string;
  title?: React.ReactNode;
  titleStyle?: StyleProp<TextProps>;
  rightIcon?: string;
};

export type HeaderProps = HeaderSimpleProps & {
  onGoBack?: () => void;
  isHideIconBack?: boolean;
  onPressRight?: (data?: TransferData) => void;
  leftElement?: React.ReactNode;
  leftProps?: ViewProps | RNTextProps | ImageProps;
  leftStyle?: StyleProp<ViewStyle>;
  centerElement?: React.ReactNode;
  centerProps?: ViewProps | RNTextProps | ImageProps;
  centerStyle?: StyleProp<ViewStyle>;
  rightElement?: React.ReactNode;
  rightProps?: ViewProps | RNTextProps | ImageProps;
  rightStyle?: StyleProp<ViewStyle>;
  colorHeader?: string;
  style?: ViewStyle | TextStyle | ImageStyle;
};
