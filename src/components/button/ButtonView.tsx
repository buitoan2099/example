import {ColorType, DimensionType} from '@commons';
import {Theme} from '@components/theme/Types';
import {useColor, useStyleSheet} from '@hooks';
import React from 'react';
import {ColorValue, StyleSheet, ViewStyle} from 'react-native';
import {vs} from 'src/commons/types';
import {Button} from './Button';
import {ButtonViewProps} from './Type';

export const buttonView = (props: ButtonViewProps) => {
  const {isOutline, style, disabled, titleStyle} = props;
  const colors = useColor() as ColorType;
  const styles = useStyleSheet(createStyles);
  const buttonView = () => {
    const styleValue = isOutline
      ? styles.outline
      : ({
          ...styles.fill,
          backgroundColor: disabled
            ? colors.buttonDisable
            : colors.buttonNormal,
        } as ViewStyle);
    return {
      ...styles.container,
      ...styleValue,
      ...style,
    };
  };
  const titleColor = (isOutline ? colors.buttonNormal : 'white') as ColorValue;

  return (
    <Button
      {...props}
      style={buttonView()}
      titleColor={titleColor}
      titleStyle={titleStyle ? titleStyle : styles.title}
      titleDisableColor={titleColor}
    />
  );
};

export default buttonView;

const createStyles = (theme: Theme) => {
  const colors = theme.color as ColorType;
  const dimension = theme.dimension as DimensionType;
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      borderRadius: dimension.buttonRadius,
      alignItems: 'center',
    },
    fill: {
      backgroundColor: colors.buttonNormal,
    },
    outline: {
      borderWidth: dimension.buttonBorderWidth,
      borderColor: colors.buttonNormal,
    },
    title: {
      fontSize: vs(14),
      fontWeight: '700',
    },
  });
  return styles;
};
