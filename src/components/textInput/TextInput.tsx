import {IconsSvg} from '@assets/icons/IconsSvg';
import {ColorType} from '@commons';
import {SvgView} from '@components/svg/SvgView';
import Text from '@components/text/Text';
import {Touchable} from '@components/Touchable';
import {useColor, useTranslation} from '@hooks';
import {vs} from '@utils';
import React, {
  forwardRef,
  isValidElement,
  memo,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  GestureResponderEvent,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {TransferData} from 'src/commons/types';
import {Input} from './Input';
import {InputRef, StateType, TextInputProps} from './Types';

function areEqual(prevProps: TextInputProps, nextProps: TextInputProps) {
  /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
  return prevProps.value === nextProps.value;
}

export const TextInput = memo(
  forwardRef((props: TextInputProps, ref: Ref<InputRef>) => {
    const {
      placeholderTextColor = '#A1A1A1',
      color = '#000000',
      focusColor = 'red',
      borderColors = 'grey',
      placeholder = 'Nhập thông tin',
      label = '',
      labelStyle,
      isLabel = !!props?.label,
      rightElement,
      leftElement,
      value,
      onPress,
      onChangeText,
      isWarning,
      warning,
      topElement,
      secureTextEntrys,
      isShowEye,
      isTypedWarning = false,
      warningStyle,
      disabledEdit = true,
      isValid,
      isShowClear,
      containerStyle,
      isBottomOutline,
    } = props;

    const [state, setState] = useState({
      isTyped: isTypedWarning,
      isFocus: false,
      valueInput: value as string,
      disabled: disabledEdit,
      isSee: false,
    } as StateType);

    const {isTyped, isFocus, valueInput, isSee, disabled} = state;
    const colors = useColor() as ColorType;
    const translation = useTranslation();

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

    const handleSecureText = useCallback(() => {
      // console.log(valueInput);
      setState({...state, isSee: !isSee});
    }, [isSee, setState, valueInput]);

    const containerStyles = () => {
      let borderColorValue = placeholderTextColor;

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
        },
        containerStyle,
      ];
    };

    const inputStyles = () => {
      return [
        isBottomOutline ? styles.inputBottomBorderStyle : styles.inputStyle,
        props.inputStyle,
      ];
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
      if (topElement) {
        return topElement;
      } else if (isLabel && label !== '') {
        return (
          <Text
            allowFontScaling={false}
            style={[
              isBottomOutline
                ? styles.labelBottomBorderStyle
                : styles.labelStyle,
              labelStyle,
            ]}>
            {label}
          </Text>
        );
      }
      return null;
    };

    const handleFocus = () => {
      setState({...state, isFocus: true});
    };

    const handleBlur = () => {
      setState({...state, isFocus: false});
    };

    const eyeIcon = useMemo(() => {
      if (secureTextEntrys) {
        return (
          <SvgView
            onPress={handleSecureText}
            style={{
              ...styles.iconStyle,
              height: stylesProps?.height ?? vs(20),
            }}
            xml={isSee ? IconsSvg.eye_on : IconsSvg.eye_off}
            iconProps={{
              width: vs(20),
              height: stylesProps?.height ?? vs(20),
              color: colors.primary,
            }}
          />
        );
      }
      return null;
    }, [handleSecureText, isSee, secureTextEntrys]);

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
              height: stylesProps?.height ?? vs(18),
            }}
            xml={IconsSvg.tick}
            iconProps={{
              width: vs(18),
              height: stylesProps?.height ?? vs(18),
              color: '#58A438',
            }}
          />
          <SvgView
            isHide={isValid === true}
            style={{
              ...styles.iconStyle,
              height: stylesProps?.height ?? vs(18),
            }}
            xml={IconsSvg.circleExclamation}
            iconProps={{
              width: vs(18),
              height: stylesProps?.height ?? vs(18),
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
              height: stylesProps?.height ?? vs(18),
            }}
            xml={IconsSvg.close}
            iconProps={{
              width: vs(18),
              height: stylesProps?.height ?? vs(18),
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
        {labelElement()}
        <Touchable
          {...props}
          // style={containerStyles()}
          ripple={false}
          onPress={props.onPress && handleOnPress}>
          <Input
            ref={ref}
            focusColor="black"
            placeholderTextColor={'#A1A1A1'}
            containerStyle={containerStyles()}
            editable={disabled}
            secureTextEntry={secureTextEntrys && !isSee}
            {...props}
            placeholder={placeholder}
            style={inputStyles()}
            value={valueInput}
            onChangeText={handleChangeText}
            leftElement={leftElement}
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
TextInput.displayName = 'TextInput';

const styles = StyleSheet.create({
  containerAllBorder: {
    borderRadius: vs(4),
    borderWidth: vs(0.5),
    alignContent: 'center',
  },
  containerBottomBorder: {
    borderBottomWidth: vs(0.5),
    alignContent: 'center',
  },
  inputStyle: {
    paddingHorizontal: vs(16),
  },
  inputBottomBorderStyle: {
    paddingHorizontal: vs(4),
  },
  requiredStyle: {
    color: 'red',
  },
  errorStyle: {
    color: 'red',
    fontStyle: 'italic',
    marginTop: vs(4),
    marginLeft: vs(4),
  },
  labelStyle: {
    color: 'grey',
    margin: vs(8),
    marginLeft: vs(0),
  },
  labelBottomBorderStyle: {
    color: 'grey',
    marginTop: vs(8),
  },
  iconStyle: {
    height: vs(40),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: vs(30),
  },
});
