import React from 'react';
import {ImageStyle, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {ButtonProps} from './Type';
import ButtonView from './ButtonView';
import {useColor, useStyleSheet} from '@hooks';
import {ColorType, DimensionType} from '@commons';
import Text from '@components/text/Text';
import {vs} from 'src/commons/types';
import {Theme} from '@components/theme/Types';

export interface ButtonTitleProps extends ButtonProps {
  isOutline?: boolean;
  isClicked?: boolean;
  borderRadius?: number;
  styleViewtitle?: ViewStyle | TextStyle | ImageStyle;
  styleTitle?: ViewStyle | TextStyle | ImageStyle;
  title: string;
  styleButton?: ViewStyle | TextStyle | ImageStyle;
  backgroundInvalidColor?: any;
}

export const ButtonTitle = (props: ButtonTitleProps) => {
  const {
    isClicked,
    styleViewtitle,
    title,
    borderRadius,
    styleTitle,
    styleButton,
    backgroundInvalidColor,
  } = props;
  const styles = useStyleSheet(CreateStyles);
  const color = useColor() as ColorType;

  return (
    <ButtonView
      {...props}
      children={
        <View style={styleViewtitle ? styleViewtitle : styles.styleViewtitle}>
          <Text
            style={[styles.titleButtonStyle, {color: color.white}, styleTitle]}>
            {title}
          </Text>
        </View>
      }
      style={
        isClicked
          ? {
              borderRadius: borderRadius ?? vs(8),
              backgroundColor: backgroundInvalidColor ?? color.colorC7C7C7,
              ...styleButton,
            }
          : {
              borderRadius: borderRadius ?? vs(8),
              ...styleButton,
            }
      }
    />
  );
};

const CreateStyles = (theme: Theme) => {
  const color = theme.color as ColorType;
  const dimension = theme.dimension as DimensionType;
  const styles = StyleSheet.create({
    titleButtonStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: '400',
      fontSize: vs(18),
      color: color.primary,
    },
    styleViewtitle: {
      padding: dimension.padding2,
    },
  });

  return styles;
};
export default ButtonTitle;
