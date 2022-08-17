import React, {isValidElement, memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {HeaderProps} from './Types';
export type {HeaderProps};
import {useStyleSheet} from '@hooks';
import {ColorType, DimensionType} from '@commons';
import {IconsSvg} from '@assets/icons/IconsSvg';
import Text from '@components/text/Text';
import {SvgView} from '@components/svg/SvgView';
import {vs} from 'src/commons/types';
import {Theme} from '@components/theme/Types';

export default function HeaderView(props: HeaderProps) {
  if (props.isHide) {
    return null;
  }
  const {
    title,
    style,
    backIcon = IconsSvg.icArrowLeft,
    rightIcon = IconsSvg.icHome,
    titleStyle,
    onGoBack,
    onPressRight,
    colorHeader = 'white',
    isHideIconBack = false,
  } = props;
  const BackElement = () => {};
  const styles = useStyleSheet(CreateStyles);

  const onPressRightIcon = () => {
    if (onPressRight) {
      onPressRight();
    } else {
      // navigateToHome()
    }
  };

  const CenterElement = useMemo(() => {
    if (typeof title === 'string') {
      return (
        <Text
          numberOfLines={1}
          style={[styles.titleStyle, {color: colorHeader}, titleStyle]}>
          {title}
        </Text>
      );
    } else if (isValidElement(title)) {
      return title;
    }
  }, [title]);

  return (
    <View style={[styles.container, style]}>
      {isHideIconBack ? (
        <View />
      ) : (
        <SvgView
          onPress={onGoBack}
          style={styles.iconBackStyle}
          xml={backIcon}
          iconProps={{
            width: vs(22),
            height: vs(22),
            color: colorHeader,
          }}
        />
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {CenterElement}
      </View>

      {rightIcon ? (
        <SvgView
          onPress={onPressRightIcon}
          style={styles.iconRightStyle}
          xml={rightIcon}
          iconProps={{
            width: vs(22),
            height: vs(22),
            color: colorHeader,
          }}
        />
      ) : null}
    </View>
  );
}
export const Header = memo(HeaderView);
Header.displayName = 'Header';

const CreateStyles = (theme: Theme) => {
  const color = theme.color as ColorType;
  const dimension = theme.dimension as DimensionType;
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: vs(26.95),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: vs(16),
      minHeight: vs(44),
      backgroundColor: color.primary,
      elevation: 1,
    },
    iconBackStyle: {
      height: '100%',
      width: vs(24),
      justifyContent: 'center',
      alignSelf: 'center',
    },
    titleStyle: {
      alignSelf: 'center',
      textAlignVertical: 'center',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: vs(16),
      lineHeight: vs(20),
      // textTransform: 'uppercase',
    },
    iconRightStyle: {
      height: '100%',
      width: vs(24),
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

  return styles;
};
