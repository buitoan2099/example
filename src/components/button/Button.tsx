import React, {isValidElement} from 'react';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import type {ButtonProps} from './Type';
import Text from '@components/text/Text';
import {Touchable} from '@components/Touchable';
import {vs} from '@utils';
export const Button = (props: ButtonProps) => {
  if (props.isHide) {
    return null;
  }
  const {
    disabled,
    disabledStyle,
    style,
    width,
    height,
    color,
    disableColor,
    borderRadius,
    titleStyle,
    titleProps,
    pressableStyle,
    titleColor,
    titleDisableColor,
  } = props;
  const stylesProps = StyleSheet.flatten<ViewStyle>(
    style as StyleProp<ViewStyle>,
  );
  const textColor = disabled ? titleDisableColor : titleColor;
  const styleButton = () => {
    if (disabled) {
      const disabledStyleProps = StyleSheet.flatten<ViewStyle>(
        disabledStyle as StyleProp<ViewStyle>,
      );
      return {
        ...stylesProps,
        ...disabledStyleProps,
        width: width ? width : disabledStyleProps?.width,
        height: height ? height : disabledStyleProps?.height,
        borderRadius: borderRadius
          ? borderRadius
          : disabledStyleProps?.borderRadius,
        backgroundColor: disableColor
          ? disableColor
          : disabledStyleProps?.backgroundColor,
      } as ViewStyle;
    } else {
      return {
        ...stylesProps,
        width: width ? width : stylesProps?.width,
        height: height ? height : stylesProps?.height,
        borderRadius: borderRadius ? borderRadius : stylesProps?.borderRadius,
        backgroundColor: color ? color : stylesProps?.backgroundColor,
      } as ViewStyle;
    }
  };
  const pressableStyleValue = (): ViewStyle => {
    return {
      padding: vs(12),
      alignItems: 'center',
      ...(pressableStyle as ViewStyle),
    };
  };

  const titlePropsValue = () => {
    if (titleProps && titleProps?.style) {
      if (titleStyle) {
        return {
          ...titleProps,
          style: {
            ...(titleProps?.style as TextStyle),
            ...(titleStyle as TextStyle),
          },
        };
      } else {
        return titleProps;
      }
    } else {
      return {style: titleStyle};
    }
  };
  if (isValidElement(props.children)) {
    return (
      <Touchable {...props} style={styleButton()}>
        {props.children}
      </Touchable>
    );
  } else {
    if (typeof props.children === 'string') {
      return (
        <Touchable
          pressableStyle={{alignItems: 'center', justifyContent: 'center'}}
          {...props}
          // style={styleButton()}
          // pressableStyle={pressableStyleValue()}
        >
          <Text {...titlePropsValue()} color={textColor}>
            {props.children}
          </Text>
        </Touchable>
      );
    } else {
      return <>{props.children}</>;
    }
  }
};
