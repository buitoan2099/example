import {SvgViewProps} from '@components/svg/Type';
import {TextProps} from '@components/text/Types';
import {ReactNode} from 'react';
import {
  ColorValue,
  ViewProps,
  ViewStyle,
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  Falsy,
  ImageStyle,
  Animated,
} from 'react-native';
import {
  BaseData,
  BaseProps,
  TouchableProps,
  TransferData,
} from 'src/commons/types';

export interface InputRef {
  setValue: (value: string) => void;
  clear: () => void;
  focus: () => void;
  blur: () => void;
  isFocused: () => void;
  currentValue?: string;
}
export interface InputProps
  extends Omit<RNTextInputProps, 'children' | 'onChangeText' | 'style'>,
    BaseProps {
  onConvertText?: (data?: BaseData | TransferData) => string;
  onChangeText?: (data?: BaseData | TransferData) => string;
  leftElement?: JSX.Element | JSX.Element[] | ReactNode;
  topElement?: JSX.Element | JSX.Element[] | ReactNode;
  rightElement?: JSX.Element | JSX.Element[] | ReactNode;
  bottomElement?: JSX.Element | JSX.Element[] | ReactNode;
  containerStyle?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  containerProps?: ViewProps;
  /**
   * [normal,focus, error, disable]
   */
  //ColorValue | ColorValue[];
  borderColors?: ColorValue;
  inputContainerStyle?: ViewStyle;
  inputContainerProps?: TouchableProps;
  isInvalid?: boolean;
  placeholderTextColor?: ColorValue;
  isLabel?: boolean;
  focusColor?: ColorValue;
}

export type StateTypeError = {
  isFocus?: boolean;
  valueInput?: string;
  componentHeight?: number;
  isTyped?: boolean;
  leftAnimated?: Animated.Value;
  topAnimated?: Animated.Value;
  disabled?: boolean;
  isSee?: boolean;
};

export type StateType = {
  isFocus?: boolean;
  valueInput?: string;
  isTyped?: boolean;
  disabled?: boolean;
  isSee?: boolean;
};

export type TextInputProps = InputProps &
  TouchableProps & {
    labelOffset?: [number, number]; ////[marginlef, margin below] is after focus
    labelBg?: string[]; ////[Bg ban đau, lúc sau] is after focus
    placeholderTextColor?: ColorValue;
    placeholder?: string | JSX.Element;
    placeholderStyle?: StyleProp<TextStyle>;
    placeholderProps?: TextProps;
    color?: ColorValue;
    focusColor?: ColorValue;
    disabledColor?: ColorValue;
    value?: string;
    isLabel?: boolean;
    isFloating?: boolean;
    label?: string | JSX.Element;
    labelStyle?: StyleProp<TextStyle>;
    labelProps?: TextProps;
    inputStyle?: StyleProp<TextStyle>;
    inputProps?: InputProps;
    secureTextEntrys?: boolean;
    /////
    isRequired?: boolean;
    required?: string | ReactNode;
    requiredStyle?: StyleProp<TextStyle> | undefined;
    isShowClear?: boolean;
    isShowEye?: boolean;
    clearElement?: SvgViewProps | ReactNode | undefined;
    useNativeDriver?: boolean;
    easing?: (value: number) => number;
    animationDuration?: number;
    left?: boolean;
    iconRight?: string | Function | undefined;
    // stylesIconRight?: TypeBaseImage;
    onPressIconRight?: (
      data?: TransferData,
    ) => void | Promise<void> | RegExp | Falsy;
    rightElement?: ReactNode;
    isWarning?: boolean;
    warning?: string | JSX.Element;
    warningStyle?: StyleProp<TextStyle>;
    warningProps?: TextProps;
    isTypedWarning?: boolean;
    disabledEdit?: boolean;
    isValid?: boolean;
    isBottomOutline?: boolean;
  };
