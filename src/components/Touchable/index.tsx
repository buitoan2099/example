import React, {useMemo, useRef} from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableProps, TransferData} from 'src/commons/types';

export const Touchable = (props: TouchableProps) => {
  if (props.isHide) {
    return null;
  }
  const {
    id,
    data,
    children,
    android_ripple,
    waitTime,
    onPress,
    style,
    pressableStyle,
  } = props;
  const disablePress = useRef<boolean>(false);

  const stylesProps = StyleSheet.flatten<ViewStyle>(
    style as StyleProp<ViewStyle>,
  );
  const handleOnPress = () => {
    if (!waitTime) {
      onPress?.({id, data} as TransferData);
    } else if (!disablePress.current) {
      onPress?.({id, data} as TransferData);
      disablePress.current = true;
      const timeout = setTimeout(() => {
        disablePress.current = false;
        clearTimeout(timeout);
      }, waitTime || 400);
    }
  };

  const androidRippleConfig = useMemo(() => {
    return {
      color: 'white',
      foreground: false,
      borderless: false,
      ...android_ripple,
    };
  }, [android_ripple]);

  const containerStyle = (): StyleProp<ViewStyle> => {
    let stprops = {
      ...styles.containerStyle,
      ...stylesProps,
      width: stylesProps?.width,
      height: stylesProps?.height,
    };
    return stprops;
  };
  const stylePressable = (pressed: boolean): StyleProp<ViewStyle> => {
    let stylePress = {
      ...styles.pressableStyle,
      width: stylesProps?.width,
      height: stylesProps?.height,
      borderRadius: stylesProps?.borderRadius,
      backgroundColor: pressed ? '#DCDCDC60' : pressableStyle?.backgroundColor,
      ...(pressableStyle as ViewStyle),
    };
    return stylePress;
  };
  return (
    <View style={containerStyle()} onLayout={props.onLayout}>
      <Pressable
        {...props}
        accessibilityRole="button"
        style={({pressed}) => stylePressable(pressed)}
        android_ripple={androidRippleConfig}
        onPress={props.onPress && handleOnPress}>
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    overflow: 'hidden',
  },
  pressableStyle: {
    borderWidth: 0,
    outlineWidth: 0,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
});
