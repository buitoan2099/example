import {IconsSvg} from '@assets/icons/IconsSvg';
import {ColorType} from '@commons';
import {SvgView} from '@components/svg/SvgView';
import Text from '@components/text/Text';
import {Touchable} from '@components/Touchable';
import {useColor, useTranslation} from '@hooks';
import {vs} from '@utils';
import React, {
  isValidElement,
  memo,
  useEffect,
  useRef,
  forwardRef,
  Ref,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextStyle,
  TextInput as RNInput,
  StyleProp,
  View,
  Platform,
  ViewStyle,
} from 'react-native';
import {TransferData} from 'src/commons/types';
import {Input} from './Input';
import {InputRef, StateType, StateTypeError, TextInputProps} from './Types';

function areEqual(prevProps: TextInputProps, nextProps: TextInputProps) {
  /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
  return prevProps.value === nextProps.value;
}

export const TextPlaceHorderCustomInput = memo(
  forwardRef((props: TextInputProps, ref: Ref<InputRef>) => {
    const {
      labelOffset = [vs(18), vs(10)],
      placeholderTextColor = '#A1A1A1',
      color = '#000000',
      focusColor = 'red',
      borderColors = 'grey',
      placeholder = 'Nhập thông tin',
      placeholderProps,
      label = '',
      labelProps,
      isLabel = !!props?.label,
      isFloating = true,
      rightElement,
      isRequired,
      required,
      requiredStyle,
      value,
      onPress,
      onChangeText,
      isWarning,
      warning,
      warningProps,
      isShowEye,
      secureTextEntry,
      isTypedWarning = false,
      warningStyle,
      disabledEdit = true,
      isValid,
      isShowClear,
      containerStyle,
      isBottomOutline,
    } = props;

    const [state, setState] = useState({
      componentHeight: 0,
      isTyped: isTypedWarning,
      isFocus: false,
      valueInput: value as string,
      leftAnimated: new Animated.Value(1),
      topAnimated: new Animated.Value(0),
      disabled: disabledEdit,
      isSee: false,
    } as StateTypeError);

    const {isTyped, isFocus, valueInput, componentHeight, isSee, disabled} =
      state;
    const valueInputAnim = useRef(
      new Animated.Value(valueInput ? 1 : 0),
    ).current;
    const colors = useColor() as ColorType;
    const translation = useTranslation();
    const onLayout = (event: LayoutChangeEvent) => {
      console.log('componentHeight', event.nativeEvent.layout.height);
      setState({...state, componentHeight: event.nativeEvent.layout.height});
    };

    const stylesProps = StyleSheet.flatten<ViewStyle>(
      styles as StyleProp<ViewStyle>,
    );

    useEffect(() => {
      const setHandleValue = () => {
        if (props.hasOwnProperty('value') && value !== valueInput) {
          setState({...state, valueInput: value!, isTyped: true});
        }
      };
      setHandleValue();
    }, [value]);

    useEffect(() => {
      const setHandleValue = () => {
        setState({...state, disabled: disabledEdit});
      };
      setHandleValue();
    }, [disabledEdit]);

    const handleOnPress = (data?: TransferData | GestureResponderEvent) => {
      onPress?.(data as TransferData);
    };

    const handleChangeText = (data?: TransferData | string) => {
      let rawData = data as TransferData;
      let convertText = onChangeText?.(rawData) as string;
      if (!convertText) {
        convertText = rawData.data as string;
      }
      setState({...state, valueInput: convertText, isTyped: true});

      return convertText;
    };

    const handleClear = useCallback(() => {
      handleChangeText({id: props.id, data: ''});
    }, [handleChangeText, props.id]);

    ///////

    const containerStyles = () => {
      let borderColorValue = placeholderTextColor;
      let paddingTop = vs(8);
      let paddingBottom = vs(4);
      if (!isLabel) {
        paddingTop = 0;
        paddingBottom = 0;
      }
      if (isFocus) {
        borderColorValue = focusColor;
      } else {
        borderColorValue = borderColors;
      }

      return [
        isBottomOutline
          ? styles.containerBottomBorder
          : styles.containerAllBorder,
        props.style,
        {
          borderColor: borderColorValue,
          paddingTop: paddingTop,
          paddingBottom: paddingBottom,
        },
      ];
    };

    const inputStyles = () => {
      if (!isLabel) {
        return [styles.inputStyle, props.inputStyle];
      } else {
        return [styles.inputStyle, props.inputStyle, {paddingBottom: -vs(10)}];
      }
    };

    const labelStyle = () => {
      const labelstyle = StyleSheet.flatten<TextStyle>(props?.labelStyle);
      let height = -componentHeight! / 2;
      let fromX = labelOffset[0];
      let toX = labelOffset[0];
      let fromY = -vs(4);
      let toY = height + labelOffset[1];
      let translateY: Animated.AnimatedInterpolation =
        valueInputAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [fromY, toY],
        });
      let translateX: Animated.AnimatedInterpolation =
        valueInputAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [fromX, toX],
        });
      let opacity = valueInputAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      });
      if (isLabel) {
        if (isFloating) {
          toY = height + labelOffset[1];
          opacity = valueInputAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1],
          });
        } else {
          toY = height + labelOffset[1];
          fromX = labelOffset[0];
          toX = labelOffset[0];
          opacity = valueInputAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1],
          });
        }
        if (valueInput) {
          fromY = toY;
          fromX = toX;
        }
        translateY = valueInputAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [fromY, toY],
        });
        translateX = valueInputAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [fromX, toX],
        });
      } else {
        if (valueInput) {
          translateY = valueInputAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0],
          });
          opacity = valueInputAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          });
        } else {
          translateY = valueInputAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [fromY, fromY],
          });
          opacity = valueInputAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1],
          });
        }
      }

      let labelColor = placeholderTextColor;
      if (isFocus) {
        labelColor = focusColor;
      }
      return [
        styles.labelStyle,
        {...labelstyle},
        {
          position: 'absolute',
          color: labelColor,
          opacity: opacity,
          transform: [{translateX: translateX}, {translateY: translateY}],
        },
      ];
    };

    const requiredElement = () => {
      if (isRequired) {
        if (required) {
          if (isValidElement(required)) {
            return required;
          } else {
            if (typeof required === 'string') {
              const text = required ? translation(required) : '*';
              return (
                <Text
                  allowFontScaling={false}
                  style={[styles.requiredStyle, requiredStyle]}>
                  {text}
                </Text>
              );
            }
            return '';
          }
        } else {
          return (
            <Text
              allowFontScaling={false}
              style={[styles.requiredStyle, requiredStyle]}>
              {'*'}
            </Text>
          );
        }
      }
      return '';
    };
    const errorElement = () => {
      if (isWarning && isTyped) {
        if (isValidElement(warning)) {
          return warning;
        } else {
          if (typeof warning === 'string') {
            const textError = warning ? translation(warning) : '';

            return (
              <Text
                allowFontScaling={false}
                style={[styles.errorStyle, warningStyle]}>
                {textError}
              </Text>
            );
          }
          return null;
        }
      }
      return null;
    };

    const labelElement = () => {
      let labelString = label;
      let placeholderString = placeholder;
      if (isValidElement(labelString)) {
        return labelString;
      } else if (typeof label === 'string') {
        let text = translation(label);
        if (labelProps?.replaceKey && labelProps?.replaceValue) {
          text = text.replace(labelProps.replaceKey, labelProps.replaceValue);
        }
        labelString = text;
      }
      if (isValidElement(placeholderString)) {
        return placeholderString;
      } else if (typeof placeholder === 'string') {
        let text = translation(placeholder);
        if (placeholderProps?.replaceKey && placeholderProps?.replaceValue) {
          text = text.replace(
            placeholderProps.replaceKey,
            placeholderProps.replaceValue,
          );
        }
        placeholderString = text;
      }
      let textString: string | JSX.Element = '';
      if (valueInput || (isFocus && labelString)) {
        textString = labelString;
      } else {
        textString = placeholderString;
      }
      if (!isLabel && valueInput) {
        textString = '';
      }
      return (
        <Text style={labelStyle()}>
          {textString}
          {requiredElement()}
        </Text>
      );
    };

    const handleFocus = () => {
      setState({...state, isFocus: true});
    };

    const handleBlur = () => {
      setState({...state, isFocus: false});
    };

    const handleSecureText = useCallback(() => {
      setState({...state, isSee: !isSee});
    }, [isSee, setState]);

    const eyeIcon = useMemo(() => {
      if (secureTextEntry && isShowEye) {
        return (
          <SvgView
            onPress={handleSecureText}
            style={{
              ...styles.iconStyle,
              height: stylesProps?.height,
            }}
            xml={isSee ? IconsSvg.eye_on : IconsSvg.eye_off}
            iconProps={{
              width: vs(20),
              height: stylesProps?.height,
              color: colors.primary,
            }}
          />
        );
      }
      return null;
    }, [colors.primary, handleSecureText, isSee, isShowEye, secureTextEntry]);

    const validIcon = useMemo(() => {
      if (isValid === undefined) {
        return null;
      }
      return (
        <>
          <SvgView
            isHide={isValid === false}
            style={{
              ...styles.iconStyle,
              height: stylesProps?.height,
            }}
            xml={IconsSvg.tick}
            iconProps={{
              width: vs(18),
              height: stylesProps?.height,
              color: '#58A438',
            }}
          />
          <SvgView
            isHide={isValid === true}
            style={{
              ...styles.iconStyle,
              height: stylesProps?.height,
            }}
            xml={IconsSvg.circleExclamation}
            iconProps={{
              width: vs(18),
              height: stylesProps?.height,
              color: 'red',
            }}
          />
        </>
      );
    }, [isValid]);

    const clearIcon = useMemo(() => {
      if (isShowClear && valueInput) {
        return (
          <SvgView
            isHide={isValid === true}
            onPress={handleClear}
            style={{
              ...styles.iconStyle,
              height: stylesProps?.height,
            }}
            xml={IconsSvg.close}
            iconProps={{
              width: vs(18),
              height: stylesProps?.height,
              color: 'rgba(0, 0, 0, 0.45)',
            }}
          />
        );
      }
      return null;
    }, [handleClear, isShowClear, valueInput]);

    const rightView = () => {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {eyeIcon}
          <View style={{marginHorizontal: vs(2)}} />
          {clearIcon}
          <View style={{marginHorizontal: vs(2)}} />
          {validIcon}
          {validIcon ? <View style={{marginHorizontal: vs(2)}} /> : null}
          {rightElement}
        </View>
      );
    };

    return (
      <>
        <Touchable
          {...props}
          // style={containerStyles()}
          ripple={false}
          onLayout={onLayout}
          onPress={props.onPress && handleOnPress}>
          <Animated.View
            style={[
              {
                height: componentHeight! + vs(8),
                left: 0,
                right: 0,
                justifyContent: 'center',
                position: 'absolute',
              },
            ]}>
            {labelElement()}
          </Animated.View>
          <Input
            ref={ref}
            focusColor="black"
            placeholderTextColor={'#A1A1A1'}
            containerStyle={containerStyles()}
            editable={disabled}
            secureTextEntry={secureTextEntry && !isSee}
            {...props}
            placeholder={''}
            style={inputStyles()}
            value={valueInput}
            onChangeText={handleChangeText}
            rightElement={rightView()}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {/* trường hop ios khi bam bi vuong input  */}
          {Platform.OS === 'ios' && !disabled && (
            <View
              style={{
                flex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}></View>
          )}
        </Touchable>

        {errorElement()}
      </>
    );
  }),
);
TextPlaceHorderCustomInput.displayName = 'TextPlaceHorderCustomInput';

const styles = StyleSheet.create({
  containerAllBorder: {
    borderRadius: vs(4),
    borderWidth: vs(0.5),
    paddingTop: vs(8),
    paddingBottom: vs(4),
    alignContent: 'center',
  },
  containerBottomBorder: {
    borderBottomWidth: vs(0.5),
    paddingTop: vs(8),
    paddingBottom: vs(4),
    alignContent: 'center',
  },
  labelStyle: {},
  inputStyle: {
    paddingHorizontal: vs(16),
  },
  requiredStyle: {
    color: 'red',
  },
  errorStyle: {
    color: 'red',
    fontStyle: 'italic',
    marginTop: vs(5),
  },
  iconStyle: {
    height: vs(40),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: vs(30),
  },
});
