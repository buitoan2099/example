import {ReactNode} from 'react';
import {
  Animated,
  ColorValue,
  Falsy,
  ImageStyle,
  PressableAndroidRippleConfig,
  PressableProps,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface ColorTheme {
  [key: string]: string;
}

//Dimension

export interface DimensionsType {
  [key: string]: DimensionKey;
}
export declare type DimensionKey =
  | number
  | string
  | {
      [key: string]: any;
    };

//Datatypes
export const vs = (size: number) => {
  return size;
};

//Base props
export declare type BaseData<I = unknown, D = unknown> = {
  id?: string | number | object | Record<string, unknown> | I;
  data?: object | string | number | boolean | Record<string, unknown> | D;
};
export declare type NavigationType<I = unknown, D = unknown> = BaseData<
  I,
  D
> & {
  index?: string | number;
  routeName?: string | object;
  preRouteName?: string | object;
  isReload?: boolean;
};
export declare type TransferData<I = unknown, D = unknown> =
  | NavigationType<I, D>
  | BaseData<I, D>;
export declare type TransParam<I = unknown, D = unknown> = BaseData<I, D> & {
  callBack?: (object?: TransferData) => void | Promise<void>;
};

export type BaseProps = {
  id?: string | number | object | Record<string | number | symbol, unknown>;
  children?: JSX.Element | JSX.Element[] | ReactNode;
  data?:
    | string
    | number
    | object
    | Record<string | number | symbol, unknown>
    | unknown;
  isHide?: boolean;
  everTouched?: boolean;
  disabled?: boolean | null;
  onPress?: (data?: TransferData) => void | Promise<void> | RegExp | Falsy;
  disableStyle?:
    | StyleProp<ViewStyle | TextStyle | ImageStyle>
    | Animated.AnimatedProps<StyleProp<ViewStyle | TextStyle | ImageStyle>>;
  focusStyle?:
    | StyleProp<ViewStyle | TextStyle | ImageStyle>
    | Animated.AnimatedProps<StyleProp<ViewStyle | TextStyle | ImageStyle>>;

  style?:
    | StyleProp<ViewStyle | TextStyle | ImageStyle>
    | Animated.AnimatedProps<StyleProp<ViewStyle | TextStyle | ImageStyle>>;
  color?: ColorValue;
  disableColor?: ColorValue;
};

export type TouchableProps = Omit<TouchableOpacityProps, 'onPress'> &
  Omit<PressableProps, 'children' | 'onPress'> &
  BaseProps & {
    waitTime?: number;
    withShadow?: boolean;
    withDebounce?: boolean;
    ripple?: boolean;
    rippleConfig?: PressableAndroidRippleConfig;
    rippleColor?: ColorValue;
    pressableStyle?: ViewStyle;
    disabledStyle?: ViewStyle;
  };
