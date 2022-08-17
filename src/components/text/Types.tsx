import type {ReactNode} from 'react';
import type {
  TextProps as RNTextProps,
  TextStyle,
  StyleProp,
  ViewProps,
  ColorValue,
} from 'react-native';
import {BaseProps, TouchableProps} from 'src/commons/types';

export type TextProps = RNTextProps &
  BaseProps & {
    size?: number;
    color?: ColorValue;
    weight?:
      | 'normal'
      | 'bold'
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | '900';
    lineHeight?: number;
    italic?: boolean;
    textDecorationLine?:
      | 'none'
      | 'underline'
      | 'line-through'
      | 'underline line-through'
      | undefined;
    fontFamily?: string;
    fontStyle?: 'normal' | 'italic';
    isTranslate?: boolean;
    replaceKey?: string;
    replaceValue?: string;
    children?: ReactNode | string;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  };

export type TextViewProps = ViewProps &
  TouchableProps & {
    size?: number;
    color?: string;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    style?: StyleProp<TextStyle>;
    isRequired?: boolean;
    required?: ReactNode;
    requiredStyle?: StyleProp<TextStyle>;
    label?: ReactNode;
    labelProps?: TextProps;
    labelStyle?: StyleProp<TextStyle>;
    value?: ReactNode;
    valueProps?: TextProps;
    valueStyle?: StyleProp<TextStyle>;
  };

export const FontWeight = {
  '100': 'Thin',
  '200': 'ExtraLight',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Regular',
  '600': 'SemiBold',
  '700': 'Bold',
  // '800': 'ExtraBold',
  '800': 'Bold',
  '900': 'Black',
  bold: 'Bold',
  normal: 'Regular',
};
