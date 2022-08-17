import Config from 'react-native-config';
import React, {memo, useMemo, isValidElement, PropsWithChildren} from 'react';
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  Animated,
  Text as RNText,
} from 'react-native';

import {FontWeight, TextProps} from './Types';
import {useColor, useTranslation} from '@hooks';
import {TransParam} from 'src/commons/types';

export default function TextM(props: TextProps) {
  if (props.isHide) {
    return null;
  }
  const {allowFontScaling = false} = props;
  const textStyle = StyleSheet.flatten<TextStyle>([props?.style]);
  const colors = useColor();

  const color = props.color || textStyle.color || colors.primary;
  const translation = useTranslation();

  const handleOnPress = () => {
    props?.onPress?.({} as TransParam);
  };

  const getSize = () => {
    return props.size || textStyle.fontSize || 14;
  };

  const getLineHeigth = () => {
    if (props.lineHeight) {
      return props.lineHeight;
    } else if (textStyle.lineHeight) {
      return textStyle.lineHeight;
    }
    return undefined;
  };

  const getFontStyle = () => {
    const weight = props.weight || textStyle.fontWeight || 'normal';
    const fontStyle = props.fontStyle || textStyle.fontStyle;
    const fontFamilyProps = props.fontFamily || textStyle.fontFamily;
    const fontsMain = `${Config.FONTS_MAIN}`;
    const fontFamily = {
      fontFamily: `${fontsMain}-Regular`,
    };

    if (fontStyle === 'italic') {
      fontFamily.fontFamily = `${fontsMain}-${FontWeight[weight]}Italic`;
    } else {
      fontFamily.fontFamily = `${fontsMain}-${FontWeight[weight]}`;
    }

    if (fontFamilyProps) {
      fontFamily.fontFamily = fontFamilyProps;
    }
    return fontFamily;
  };
  const getStyle = useMemo((): Animated.WithAnimatedValue<
    StyleProp<TextStyle>
  > => {
    const styleM = {
      color: color,
      fontSize: getSize(),
      lineHeight: getLineHeigth(),
      textAlign: props.textAlign,
    };
    return [props.style, getFontStyle(), styleM];
  }, [props.style]);

  const childrenView = () => {
    if (isValidElement(props.children)) {
      return props.children;
    } else if (typeof props.children === 'string') {
      let text = translation(props.children);
      if (props.replaceKey && props.replaceValue) {
        text = text.replace(props.replaceKey, props.replaceValue);
      }
      return text;
    } else {
      return props.children;
    }
  };
  return (
    <Animated.Text
      {...(props as PropsWithChildren<RNText>)}
      allowFontScaling={allowFontScaling}
      style={getStyle}
      onPress={props?.onPress && handleOnPress}>
      {childrenView()}
    </Animated.Text>
  );
}
export const Text = memo(TextM);
Text.displayName = 'Text';
